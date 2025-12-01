# Dual Git Repository Setup 🚀

This project uses **two separate git repositories**:

## 📁 Repository Structure

### 1️⃣ **Parent Repository** (This Repo)
- **Remote:** `https://github.com/awesomealexsye/arbaz-profile`
- **Purpose:** Source code, development files
- **Branch:** `main`

### 2️⃣ **Dist Repository** (GitHub Pages)
- **Location:** `/dist` folder
- **Remote:** `https://github.com/awesomealexsye/awesomealexsye.github.io`
- **Purpose:** Production build, live website
- **Branch:** `main`
- **Live Site:** https://awesomealexsye.github.io

## 🔧 How It Works

The `dist` folder is **ignored by the parent repo** (except for `dist/.git`), allowing it to have its own git repository.

### Working with Parent Repo
```bash
# From project root
git add .
git commit -m "your message"
git push origin main
```

### Working with Dist Repo (GitHub Pages)
```bash
# Option 1: Use deploy script (RECOMMENDED)
./deploy.sh

# Option 2: Manual from root
cd dist
git add .
git commit -m "deploy"
git push origin main
cd ..

# Option 3: Direct from dist folder
cd dist
git add .
git commit -m "update"
git push origin main
```

## 🚀 Deployment Workflow

### Quick Deploy
```bash
npm run build     # Build the project
./deploy.sh       # Deploy to GitHub Pages
```

### What deploy.sh Does:
1. ✅ Builds your project (`npm run build`)
2. ✅ Initializes git in `dist` (if needed)
3. ✅ Commits all changes with timestamp
4. ✅ Force pushes to GitHub Pages
5. ✅ Shows success message with live URL

## 📝 Common Commands

### Development
```bash
npm run dev       # Start dev server
npm run build     # Build for production
```

### Parent Repo
```bash
git status        # Check parent repo status
git add .         # Stage parent repo changes
git commit -m ""  # Commit parent repo
git push          # Push parent repo
```

### Deployment
```bash
./deploy.sh       # Build + Deploy to GitHub Pages
```

### Manual Dist Management
```bash
cd dist           # Enter dist folder
git status        # Check dist repo status
git log           # View dist repo history
git push          # Push dist repo
cd ..             # Return to parent
```

## ⚠️ Important Notes

1. **Never commit dist folder to parent repo** - It's in `.gitignore` (except `dist/.git`)
2. **Always use `./deploy.sh` for deployment** - It handles everything automatically
3. **Parent and dist are INDEPENDENT** - They don't affect each other
4. **Git commands work based on current directory:**
   - In project root → affects parent repo
   - In `dist/` → affects GitHub Pages repo

## 🎯 Benefits

✅ **Separate Histories** - Source code and builds tracked independently  
✅ **Clean Workflow** - No build artifacts in source repo  
✅ **Easy Deployment** - One command deploys everything  
✅ **GitHub Pages Ready** - Dist repo configured for static hosting  

## 🔍 Troubleshooting

### Issue: "fatal: not a git repository" in dist
**Solution:** Run `./deploy.sh` - it will initialize git in dist

### Issue: Push rejected
**Solution:** The script uses force push (`-f`), so this shouldn't happen

### Issue: Changes not showing on live site
**Solution:** 
1. Check GitHub Pages settings at: https://github.com/awesomealexsye/awesomealexsye.github.io/settings/pages
2. Ensure source is set to `main` branch, `/ (root)`
3. Wait 1-2 minutes for GitHub to rebuild

## 📚 Quick Reference

| Action | Command |
|--------|---------|
| Develop locally | `npm run dev` |
| Build project | `npm run build` |
| Deploy to GitHub Pages | `./deploy.sh` |
| Commit source code | `git add . && git commit -m "msg" && git push` |
| Check parent repo | `git status` |
| Check dist repo | `cd dist && git status && cd ..` |

---

**Happy Coding! 🌟**
