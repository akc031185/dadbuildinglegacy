import { NextRequest, NextResponse } from 'next/server'

const VERCEL_API_BASE = 'https://api.vercel.com'

export async function POST(request: NextRequest) {
  let body: any = {}
  try {
    body = await request.json()
    const { operation, ...params } = body

    const vercelToken = process.env.VERCEL_TOKEN
    const vercelTeamId = process.env.VERCEL_TEAM_ID

    if (!vercelToken) {
      throw new Error('VERCEL_TOKEN environment variable is required')
    }

    const headers = {
      'Authorization': `Bearer ${vercelToken}`,
      'Content-Type': 'application/json'
    }

    let result

    switch (operation) {
      case 'create-project':
        result = await createProject(params, headers, vercelTeamId)
        break

      case 'set-environment-variables':
        result = await setEnvironmentVariables(params, headers)
        break

      case 'create-deployment':
        result = await createDeployment(params, headers)
        break

      case 'add-domain':
        result = await addDomain(params, headers)
        break

      case 'list-projects':
        result = await listProjects(headers, vercelTeamId)
        break

      case 'get-project':
        result = await getProject(params, headers)
        break

      default:
        throw new Error(`Unknown Vercel operation: ${operation}`)
    }

    return NextResponse.json({
      success: true,
      operation,
      data: result,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Vercel operations error:', error)
    
    return NextResponse.json({
      success: false,
      operation: body?.operation || 'unknown',
      error: error instanceof Error ? error.message : 'Unknown Vercel error'
    }, { status: 400 })
  }
}

async function createProject(params: any, headers: any, teamId?: string) {
  const { 
    name, 
    gitRepository, 
    framework = 'nextjs',
    buildCommand = 'npm run build',
    outputDirectory = '.next',
    installCommand = 'npm install',
    devCommand = 'npm run dev'
  } = params

  if (!name || !gitRepository) {
    throw new Error('name and gitRepository are required for project creation')
  }

  let url = `${VERCEL_API_BASE}/v10/projects`
  if (teamId) {
    url += `?teamId=${teamId}`
  }

  const projectData = {
    name,
    gitRepository,
    framework,
    buildCommand,
    outputDirectory,
    installCommand,
    devCommand
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(projectData)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Vercel API error: ${error.error?.message || response.statusText}`)
  }

  return await response.json()
}

async function setEnvironmentVariables(params: any, headers: any) {
  const { projectId, envVars } = params

  if (!projectId || !envVars || Object.keys(envVars).length === 0) {
    throw new Error('projectId and envVars are required')
  }

  const results = []

  // Set environment variables one by one
  for (const [key, value] of Object.entries(envVars)) {
    try {
      const envVarData = {
        type: 'encrypted',
        key,
        value: String(value),
        target: ['production', 'preview']
      }

      const response = await fetch(`${VERCEL_API_BASE}/v10/projects/${projectId}/env`, {
        method: 'POST',
        headers,
        body: JSON.stringify(envVarData)
      })

      if (!response.ok) {
        const error = await response.json()
        results.push({
          key,
          success: false,
          error: error.error?.message || 'Failed to set environment variable'
        })
      } else {
        const result = await response.json()
        results.push({
          key,
          success: true,
          id: result.id
        })
      }
    } catch (error) {
      results.push({
        key,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  return { results, totalSet: results.filter(r => r.success).length }
}

async function createDeployment(params: any, headers: any) {
  const { 
    name,
    gitRepository,
    projectSettings = {},
    target = 'production'
  } = params

  if (!name || !gitRepository) {
    throw new Error('name and gitRepository are required for deployment')
  }

  const deploymentData = {
    name,
    gitRepository,
    projectSettings,
    target
  }

  const response = await fetch(`${VERCEL_API_BASE}/v13/deployments`, {
    method: 'POST',
    headers,
    body: JSON.stringify(deploymentData)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Vercel API error: ${error.error?.message || response.statusText}`)
  }

  return await response.json()
}

async function addDomain(params: any, headers: any) {
  const { projectId, domain } = params

  if (!projectId || !domain) {
    throw new Error('projectId and domain are required')
  }

  const domainData = {
    name: domain
  }

  const response = await fetch(`${VERCEL_API_BASE}/v10/projects/${projectId}/domains`, {
    method: 'POST',
    headers,
    body: JSON.stringify(domainData)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Vercel API error: ${error.error?.message || response.statusText}`)
  }

  return await response.json()
}

async function listProjects(headers: any, teamId?: string) {
  let url = `${VERCEL_API_BASE}/v9/projects?limit=20`
  if (teamId) {
    url += `&teamId=${teamId}`
  }

  const response = await fetch(url, {
    method: 'GET',
    headers
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Vercel API error: ${error.error?.message || response.statusText}`)
  }

  return await response.json()
}

async function getProject(params: any, headers: any) {
  const { projectId } = params

  if (!projectId) {
    throw new Error('projectId is required')
  }

  const response = await fetch(`${VERCEL_API_BASE}/v9/projects/${projectId}`, {
    method: 'GET',
    headers
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Vercel API error: ${error.error?.message || response.statusText}`)
  }

  return await response.json()
}