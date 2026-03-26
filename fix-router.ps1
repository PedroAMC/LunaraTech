# Reescribir correctamente el import de useRouter
$paths = @(
  "src\app\admin\productos\page.tsx",
  "src\app\admin\inventario\page.tsx"
)

foreach ($p in $paths) {
  if (Test-Path $p) {
    $txt = Get-Content $p -Raw

    # Elimina imports rotos o duplicados de useRouter
    $txt = $txt -replace 'import\s+\{\s*useRouter\s*\}.*?["''].*?;', ''

    # Inserta el import correcto justo después del primer import
    $txt = $txt -replace '(import\s+[^\r\n]+;\s*)', "$1`r`nimport { useRouter } from 'next/navigation';`r`n", 1

    Set-Content -Path $p -Value $txt -Encoding utf8
    Write-Host "Import reparado en $p" -ForegroundColor Green
  }
  else {
    Write-Host "Archivo no encontrado: $p" -ForegroundColor Yellow
  }
}

Write-Host "`nListo. Guarda todo y corre 'npm run dev' otra vez. useRouter quedará definido correctamente." -ForegroundColor Cyan
