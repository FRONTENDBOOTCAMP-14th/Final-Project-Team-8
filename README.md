<!-- --------------------------------------------------------------------------------- -->

# 🐾 PAW BUDDY - 반려동물 관리 웹 앱

## 📑 목차

- [🐾 PAW BUDDY - 반려동물 관리 웹 앱](#-pow-buddy---반려동물-관리-웹-앱)
  - [📋 팀 요약 (한눈에 보기)](#-팀-요약-한눈에-보기)
  - [1️⃣ 프로젝트 개요](#1️⃣-프로젝트-개요)
    - [🎯 프로젝트 목적 & 목표](#-프로젝트-목적--목표)
  - [2️⃣ 핵심 기능](#2️⃣-핵심-기능)
    - [All-in-One 관리](#all-in-one-관리)
    - [사용자 편의성](#사용자-편의성)
    - [데이터 기반 기록](#데이터-기반-기록)
    - [서비스 주요 기능](#서비스-주요-기능)
  - [3️⃣ 기술 스택](#3️⃣-기술-스택)
  - [4️⃣ 컨벤션 조의](#4️⃣-컨벤션-정의)
    - [파일 폴더 구조](#-파일--폴더-구조)
    - [git 컨벤션](#-git-컨벤션)
  - [5️⃣ 아키텍처 / 페이지 구조](#4️⃣-아키텍처--페이지-구조)
    - [페이지 플로우-diagram](#페이지-플로우diagram)
    - [페이지 플로우-시각화](#페이지-플로우시각화)
  - [6️⃣ 참고 문서 & 링크](#5️⃣-참고-문서--링크)

## 📋 팀 요약 (한눈에 보기)

|                                          ![김동규](/src/docs/images/profile-example.jpg)                                           |                                            ![장효정](/src/docs/images/profile-example.jpg)                                            |                                            ![정지은](/src/docs/images/profile-example.jpg)                                            |                                            ![우혜리](/src/docs/images/profile-example.jpg)                                            |
| :--------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: |
|                                                             **김동규**                                                             |                                                              **장효정**                                                               |                                                              **정지은**                                                               |                                                              **우혜리**                                                               |
|                                                          Frontend / 조장                                                           |                                                               Frontend                                                                |                                                               Frontend                                                                |                                                               Frontend                                                                |
| <img src="/src/docs/images/git-icon.png" alt="git-icon" style="width:20px; margin-right:5px;">[GitHub](https://github.com/cit1566) | <img src="/src/docs/images/git-icon.png" alt="git-icon" style="width:20px; margin-right:5px;">[GitHub](https://github.com/{{github}}) | <img src="/src/docs/images/git-icon.png" alt="git-icon" style="width:20px; margin-right:5px;">[GitHub](https://github.com/{{github}}) | <img src="/src/docs/images/git-icon.png" alt="git-icon" style="width:20px; margin-right:5px;">[GitHub](https://github.com/{{github}}) |
|                                                         cit1566@gmail.com                                                          |                                                          {{email@email.com}}                                                          |                                                          {{email@email.com}}                                                          |                                                          {{email@email.com}}                                                          |

## 1️⃣ 프로젝트 개요

- **프로젝트명:** PAW BUDDY
- **주제:** 반려동물 관리 서비스 웹 앱  
  반려동물의 건강, 식단, 일정 등을 한 곳에서 체계적으로 관리할 수 있는 웹 서비스입니다.

### 🎯 프로젝트 목적 & 목표

1인 가구 증가와 함께 반려동물을 키우는 가구도 증가하고 있습니다.  
이에 따라 반려동물 양육의 체계적 관리 필요성이 높아지고 있어, **일정·건강·식단 관리 통합 웹 서비스**를 목표로 프로젝트를 진행하였습니다.

---

## 2️⃣ 핵심 기능

### All-in-One 관리

- **일정 + 건강 + 식단 + 활동**을 하나의 플랫폼에서 통합 관리

### 사용자 편의성

- 직관적인 UI/UX
- 알림 기능 제공

### 데이터 기반 기록

- 반려동물의 건강·생활 이력을 **시각적으로 확인 가능**

### 서비스 주요 기능

- **반려동물 관리:** 등록, 프로필 관리, 건강 카드(예방접종, 구충제, 의료 기록 등)
- **일정 관리:** 캘린더(일정 추가, 다가오는 일정 확인)
- **활동 & 식단 관리:** 산책·플랜트랙 등 활동 기록, 식단 기록 및 알림

---

## 3️⃣ 기술 스택

| 구분           | 기술/도구                                                                                                                                                                                                                                                                                      | 설명                                              |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Frontend**   | ![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-skyblue?style=for-the-badge&logo=tailwind-css) | SSR/SSG 지원, 타입 안정성, 유틸리티 기반 스타일링 |
| **Backend**    | ![Next.js API Routes](https://img.shields.io/badge/Next.js_API_Routes-black?style=for-the-badge&logo=next.js) ![Supabase](https://img.shields.io/badge/Supabase-blue?style=for-the-badge&logo=supabase)                                                                                        | 서버리스 API, 인증/실시간 DB 지원                 |
| **Database**   | ![Supabase](https://img.shields.io/badge/Supabase-blue?style=for-the-badge&logo=supabase) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue?style=for-the-badge&logo=postgresql)                                                                                                      | 관계형 DB, SQL 기반, 실시간 구독 가능             |
| **Deployment** | ![Vercel](https://img.shields.io/badge/Vercel-black?style=for-the-badge&logo=vercel)                                                                                                                                                                                                           | Next.js 최적화 호스팅, 서버리스 함수, CI/CD 지원  |

- **Frontend:** Next.js, TypeScript, TailwindCSS
- **Backend:** Next.js API Routes, Supabase
- **Database:** Supabase(PostgreSQL 기반)
- **Deployment:** Vercel

---

## 4️⃣ 컨벤션 정의

### 📂 파일 & 폴더 구조

```bash
/src
/app # Next.js 13 이상 App Router 구조
/components # 공통 UI 컴포넌트
/utils # 기능 단위 모듈 (예: health, life, schedule 등)
/hooks # 커스텀 훅
/lib # API, 공용 유틸 함수
/styles # 전역 스타일, 테마
/types # 공용 타입 정의 (예: Pet, Schedule)
/assets # 이미지, 아이콘 등 정적 파일
```

- **폴더명**: kebab-case
  > 예: `health-record`, `life-log`
- **컴포넌트 파일명**: PascalCase
  > 예: `PetCard.tsx`, `CalendarView.tsx`
- **유틸 함수/훅 파일명**: camelCase
  > 예: `usePetRecord.ts`, `fetchData.ts`

### 🌱 Git 컨벤션

**브랜치 네이밍**

| 타입      | 형식             | 예시                          |
| --------- | ---------------- | ----------------------------- |
| 기능 개발 | `feature/기능명` | `feature/health-record-ui`    |
| 버그 수정 | `fix/버그설명`   | `fix/date-picker-bug`         |
| 리팩토링  | `refactor/대상`  | `refactor/schedule-component` |

- **커밋 메시지**

  ```bash
  [type] 설명
  ```

- **type**: feat, fix, refactor, docs, style, test, chore, perf
- **예시**:
  - `[feat] 건강 기록 추가 API 연동`
  - `[refactor] ScheduleList 컴포넌트 구조 개선`

**Issue 작성 규칙**

- **Title 규칙**

  ```bash
  [type] 간단한 설명
  ```

- type: feat, fix, refactor, docs, style, test, chore, perf
- 설명: 작업 대상/의도를 짧고 명확히 작성
- 예시:
  - `[feat] 건강 기록 UI 컴포넌트 추가`
  - `[fix] DatePicker 선택 오류 수정`
  - `[refactor] ScheduleList 상태 관리 개선`

**Description**

```bash
## 📌 목적

이슈의 목적을 간단히 설명

## 🛠️ 작업 내용

- [ ] 할 일 1
- [ ] 할 일 2
- [ ] 할 일 3

## ✅ 참고 사항

관련 문서, 디자인 링크, 추가 맥락 등
```

### 스타일 컨벤션 및 추가 사항

**[CSS & 스타일링 컨벤션](/docs/conventions.md)**

---

## 5️⃣ 아키텍처 / 페이지 구조

### 페이지 플로우(Diagram)

![페이지 플로우](src/docs/images/page-flow.png)

- 서비스 전반적인 **페이지 흐름** 시각화

### 페이지 플로우(시각화)

![페이지 플로우 세부](src/docs/images/page-flow-page.png)

- 각 페이지별 **세부 구조** 정리

---

## 참고 문서 & 링크

- [프로젝트 노션](https://www.notion.so/pALL-27873873401a8015a67cc3c56c3e8321?source=copy_link)
- [디자인 시안 (Figma)](https://www.figma.com/design/Ujxn7gdkda0dSpBUMwg5fg/pALL-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%95%88?node-id=1008-78018&p&t=DnK5PTgjhyUDzIi6-0)
- [배포 링크 - 미정]()
