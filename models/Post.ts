import mongoose, { Document, Schema, Model } from "mongoose";

export interface IPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: ("ai" | "health")[];
  coverImage?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema<IPost> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"]
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"]
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
      maxlength: [300, "Excerpt cannot exceed 300 characters"]
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true
    },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: function(tags: string[]) {
          return tags.length > 0 && tags.every(tag => ["ai", "health"].includes(tag));
        },
        message: "Tags must include at least one of: ai, health"
      }
    },
    coverImage: {
      type: String,
      trim: true
    },
    published: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create indexes for better query performance
PostSchema.index({ slug: 1 });
PostSchema.index({ tags: 1 });
PostSchema.index({ published: 1 });
PostSchema.index({ createdAt: -1 });

// Pre-save middleware to generate slug if not provided
PostSchema.pre("save", function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
  next();
});

// Static method to find published posts
PostSchema.statics.findPublished = function(filter = {}) {
  return this.find({ ...filter, published: true }).sort({ createdAt: -1 });
};

// Static method to find posts by tag
PostSchema.statics.findByTag = function(tag: string) {
  return this.findPublished({ tags: tag });
};

const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;