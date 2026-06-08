@echo off
REM GoDaddy Deployment Script for Windows
REM This script automates the preparation and building of your project for deployment

setlocal enabledelayedexpansion

echo.
echo ============================================================
echo 🚀 Nextdot - GoDaddy Deployment Preparation Script (Windows)
echo ============================================================
echo.

REM Check if Node.js is installed
echo 📋 Checking prerequisites...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed. Please install npm first.
    exit /b 1
)

echo ✓ Node.js found
echo ✓ npm found
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)
echo ✓ Dependencies installed successfully
echo.

REM Run linting
echo 🔍 Running linter...
call npm run lint
if %ERRORLEVEL% EQU 0 (
    echo ✓ Linting passed
) else (
    echo ⚠ Linting warnings found (non-blocking^)
)
echo.

REM Build the project
echo 🔨 Building for production...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed
    exit /b 1
)
echo ✓ Build completed successfully
echo.

REM Display build results
echo 📊 Build Summary
echo ===============
echo.
if exist dist (
    echo Build directory: dist\
    echo.
    echo Contents:
    dir /B dist
    echo.
)

REM Create deployment structure info
echo 📦 Deployment Package Information
echo ==================================
echo.
echo Deployment Structure (upload to public_html\):
echo.
echo public_html\
echo ├── index.html                    (SPA entry point)
echo ├── .htaccess                     (SPA routing configuration)
echo ├── css\
echo │   └── style.css                (Main stylesheet)
echo ├── js\
echo │   ├── script.js                (Main JavaScript)
echo │   └── [name]-[hash].js         (Chunked modules)
echo ├── images\
echo │   └── [image files]
echo └── videos\
echo     └── [video files]
echo.

echo 📋 Next Steps:
echo 1. Review the deployment structure above
echo 2. Upload all files from 'dist\' folder to GoDaddy public_html\
echo 3. Upload '.htaccess' file (ensure it's not hidden)
echo 4. Update .htaccess RewriteBase if needed:
echo    - For root: RewriteBase /
echo    - For subfolder: RewriteBase /nextdot/
echo 5. Test all routes on your live domain
echo 6. Check browser console for errors
echo.

echo ✅ Deployment preparation complete!
echo.
echo 📖 For detailed instructions, see: GODADDY_DEPLOYMENT_GUIDE.md
echo.

pause
