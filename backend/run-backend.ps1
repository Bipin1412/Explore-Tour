$projectRoot = Split-Path -Parent $PSScriptRoot
$mavenHome = Join-Path $projectRoot "tools\apache-maven-3.9.14"
$mavenCmd = Join-Path $mavenHome "bin\mvn.cmd"

if (-not (Test-Path $mavenCmd)) {
  Write-Error "Local Maven not found at $mavenCmd"
  exit 1
}

& $mavenCmd spring-boot:run
