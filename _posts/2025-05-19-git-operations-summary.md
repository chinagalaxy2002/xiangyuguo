---
layout: post
title: "Git 操作流程总结：撤销错误 Commit 并 Push 文件到指定目录"
date: 2025-05-19
author: gxyu
---

# Git 操作流程总结：撤销错误 Commit 并 Push 文件到指定目录

## 概述

本文档总结了撤销上一次错误 commit 以及将 `LLM-Uncertainty-Bench` 内容正确 push 到远程仓库 `2024-NIPS-LLM-Uncertainty` 目录的操作流程。

## 一、撤销上一次错误的 Commit

### 1. 查看最近的提交记录

使用以下命令查看最近两次提交的哈希值，确认需要回退的正确 commit（例如 `ebcc360`）：

```bash
git log --oneline -n 2
```

### 2. 回退到正确的 Commit 并强制推送

通过以下命令将本地仓库回退到指定 commit，并强制推送到远程仓库，撤销错误的 push：

```bash
git reset --hard ebcc360
git push origin main --force
```

**结果**：远程仓库恢复到上一次正确状态，错误 commit 被撤销。

## 二、正确 Push 到指定目录（`2024-NIPS-LLM-Uncertainty`）

### 1. 复制文件到目标目录

将 `LLM-Uncertainty-Bench` 目录中的内容复制到 `2024-NIPS-LLM-Uncertainty` 目录，保留目标目录中原有文件（合并内容）：

```bash
cp -r /home/guoxiangyu/LLM-Uncertainty-Bench/* /home/guoxiangyu/LLM-Base/2024-NIPS-LLM-Uncertainty/
```

### 2. 添加更改到 Git 暂存区

进入 `LLM-Base` 目录，将所有更改添加到暂存区：

```bash
cd /home/guoxiangyu/LLM-Base
git add .
```

### 3. 提交更改

提交更改并添加描述性提交信息：

```bash
git commit -m "feat: add LLM-Uncertainty-Bench content to 2024-NIPS-LLM-Uncertainty directory"
```

### 4. 推送到远程仓库

将更改推送到远程仓库的 `main` 分支：

```bash
git push origin main
```

## 三、操作结果与注意事项

### 1. 操作结果

- `LLM-Uncertainty-Bench` 的内容已成功 push 到远程仓库的 `2024-NIPS-LLM-Uncertainty` 目录下。
- 错误 commit 已成功撤销，远程仓库恢复到正确状态。

### 2. 注意事项

- GitHub 提示存在大文件，建议使用 **Git LFS**（Git Large File Storage）管理大文件，以优化仓库性能。
- 强制推送（`--force`）会覆盖远程仓库内容，操作前需确认团队协作情况，避免覆盖他人提交。

## 附录

如需进一步优化大文件管理，可参考 Git LFS 官方文档或执行以下命令初始化 LFS：

```bash
git lfs install
git lfs track "*.大文件扩展名"
git add .gitattributes
``` 