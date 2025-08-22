import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BranchCardProps {
  title: string;
  description: string;
  links?: Array<{ name: string; url: string }>;
  action?: string;
  actionLink?: string;
  note?: string;
  icon?: React.ReactNode;
}

export function BranchCard({ 
  title, 
  description, 
  links, 
  action, 
  actionLink, 
  note,
  icon 
}: BranchCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          {icon}
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {links && links.length > 0 && (
          <div className="space-y-3 mb-4">
            {links.map((link, index) => (
              <div key={index}>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button variant="outline" className="w-full justify-start">
                    {link.name}
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}

        {action && (
          <Link href={actionLink || "/journal"}>
            <Button className="w-full">
              {action}
            </Button>
          </Link>
        )}

        {note && (
          <div className="mt-4">
            <Badge variant="secondary" className="text-xs">
              {note}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}