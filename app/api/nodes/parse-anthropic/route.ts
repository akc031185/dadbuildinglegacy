import { NextRequest, NextResponse } from 'next/server'

interface AnthropicResponse {
  content?: Array<{ text: string; type: string }>
  [key: string]: any
}

export async function POST(request: NextRequest) {
  let body: any = {}
  try {
    body = await request.json()
    const { agentType, anthropicResponse } = body

    if (!anthropicResponse) {
      throw new Error('anthropicResponse is required')
    }

    let parsedContent: any

    try {
      // Handle Anthropic API response format
      if (anthropicResponse.content && Array.isArray(anthropicResponse.content)) {
        // Extract text from first content block
        const textContent = anthropicResponse.content[0]?.text
        if (!textContent) {
          throw new Error('No text content in Anthropic response')
        }
        parsedContent = JSON.parse(textContent)
      } else if (anthropicResponse.content && typeof anthropicResponse.content === 'string') {
        parsedContent = JSON.parse(anthropicResponse.content)
      } else if (typeof anthropicResponse === 'string') {
        parsedContent = JSON.parse(anthropicResponse)
      } else {
        // If already parsed, use as-is
        parsedContent = anthropicResponse
      }

      // Validate response based on agent type
      switch (agentType) {
        case 'domain-sherpa':
          if (!parsedContent.suggestions || !parsedContent.chosen) {
            throw new Error('Domain Sherpa response must have suggestions and chosen fields')
          }
          // Ensure suggestions is an array
          if (!Array.isArray(parsedContent.suggestions)) {
            throw new Error('suggestions must be an array')
          }
          break

        case 'logo-brandsmith':
          if (!parsedContent.assets || !parsedContent.brandGuide) {
            throw new Error('Logo Brandsmith response must have assets and brandGuide fields')
          }
          break

        case 'site-builder':
          if (!parsedContent.template || !parsedContent.content) {
            throw new Error('Site Builder response must have template and content fields')
          }
          break

        default:
          // For other agents, just ensure we have some content
          if (Object.keys(parsedContent).length === 0) {
            throw new Error('Parsed content is empty')
          }
      }

    } catch (parseError) {
      // If parsing fails, create a structured fallback response
      console.error('Failed to parse Anthropic response:', parseError)
      
      parsedContent = createFallbackResponse(agentType, parseError instanceof Error ? parseError.message : 'Unknown parsing error', anthropicResponse)
    }

    return NextResponse.json({
      success: true,
      data: parsedContent,
      agentType,
      timestamp: new Date().toISOString(),
      parsed: true
    })

  } catch (error) {
    console.error('Parse Anthropic error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown parsing error',
      rawResponse: body?.anthropicResponse || 'unknown'
    }, { status: 400 })
  }
}

function createFallbackResponse(agentType: string, errorMessage: string, rawResponse: any) {
  switch (agentType) {
    case 'domain-sherpa':
      return {
        suggestions: [
          {
            domain: "example.com",
            reasoning: `Fallback domain due to parsing error: ${errorMessage}`,
            available: true,
            premium: false
          }
        ],
        chosen: {
          domain: "example.com",
          reasoning: "Fallback response due to API parsing error"
        },
        error: errorMessage,
        rawResponse
      }

    case 'logo-brandsmith':
      return {
        assets: {
          svg: "https://via.placeholder.com/200x200.svg",
          png: "https://via.placeholder.com/200x200.png",
          favicon: "https://via.placeholder.com/32x32.ico"
        },
        brandGuide: {
          primaryColors: ["#000000", "#FFFFFF"],
          fonts: ["Arial", "Helvetica"],
          logoUsage: "Fallback brand guide due to parsing error",
          variations: ["light", "dark"]
        },
        error: errorMessage,
        rawResponse
      }

    case 'site-builder':
      return {
        template: "Landing",
        content: {
          hero: {
            headline: "Fallback Content",
            subheadline: "Content generation failed, showing fallback"
          },
          valueProps: [
            {
              title: "Error Recovery",
              description: "This is a fallback response due to parsing error"
            }
          ],
          cta: {
            primary: "Get Started",
            secondary: "Learn More"
          },
          faq: [
            {
              question: "What happened?",
              answer: `Parsing error: ${errorMessage}`
            }
          ]
        },
        error: errorMessage,
        rawResponse
      }

    default:
      return {
        fallback: true,
        error: errorMessage,
        message: "Failed to parse response, showing fallback",
        rawResponse
      }
  }
}