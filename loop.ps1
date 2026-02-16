# Ralph Wiggum Loop - Fresh context per iteration (PowerShell v5)
# Usage: .\loop.ps1 [-Mode plan|build] [-MaxIterations 0]
#
# Examples:
#   .\loop.ps1 -Mode plan             # Planning mode, unlimited
#   .\loop.ps1 -Mode plan -MaxIterations 5   # Planning mode, max 5
#   .\loop.ps1 -Mode build            # Build mode, unlimited
#   .\loop.ps1 -Mode build -MaxIterations 20 # Build mode, max 20

param(
    [ValidateSet('plan', 'build')]
    [string]$Mode = 'build',

    [int]$MaxIterations = 0
)

$ErrorActionPreference = 'Stop'

if ($Mode -eq 'plan') {
    $PromptFile = 'PROMPT_plan.md'
} else {
    $PromptFile = 'PROMPT_build.md'
}

if (-not (Test-Path $PromptFile)) {
    Write-Error "Error: $PromptFile not found"
    exit 1
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Ralph Wiggum Loop" -ForegroundColor Cyan
Write-Host "Mode: $Mode" -ForegroundColor Cyan
Write-Host "Prompt: $PromptFile" -ForegroundColor Cyan
if ($MaxIterations -gt 0) {
    Write-Host "Max iterations: $MaxIterations" -ForegroundColor Cyan
}
Write-Host "==========================================" -ForegroundColor Cyan

$Iteration = 0

while ($true) {
    if ($MaxIterations -gt 0 -and $Iteration -ge $MaxIterations) {
        Write-Host ""
        Write-Host "Reached max iterations ($MaxIterations). Stopping." -ForegroundColor Yellow
        break
    }

    $Iteration++
    Write-Host ""
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "Iteration $Iteration (Mode: $Mode)" -ForegroundColor Cyan
    Write-Host (Get-Date -Format 'yyyy-MM-dd HH:mm:ss') -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan

    # Fresh Claude session each iteration - context resets!
    $PromptContent = Get-Content $PromptFile -Raw
    $PromptContent | claude -p --dangerously-skip-permissions --model sonnet

    if ($LASTEXITCODE -ne 0) {
        Write-Host "Claude exited with error code $LASTEXITCODE" -ForegroundColor Red
        break
    }

    # Auto-commit progress after each iteration
    git add -A
    $HasChanges = git diff --staged --quiet 2>&1
    if ($LASTEXITCODE -ne 0) {
        git commit -m "Ralph iteration $Iteration ($Mode mode)`n`nCo-Authored-By: Claude <noreply@anthropic.com>"
        Write-Host "Changes committed." -ForegroundColor Green
    } else {
        Write-Host "No changes to commit." -ForegroundColor Yellow
    }

    Write-Host "Iteration $Iteration complete." -ForegroundColor Green
    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "Ralph loop finished after $Iteration iterations." -ForegroundColor Cyan
