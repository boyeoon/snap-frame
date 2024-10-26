# Snap Frame

![selete-snap-frame](https://i.imgur.com/Pszkoy2.png)

웹사이트는 현재 [snap-frame](https://snap-frame.vercel.app)에서 호스팅되고 있습니다.

이 프로젝트는 사용자가 웹캠으로 사진을 찍고, 이를 다운로드할 수 있는 웹 어플리케이션입니다. 사용자는 카메라를 켜고, 각 프레임을 선택하여 포즈를 취한 뒤 카메라 버튼을 눌러 사진을 찍을 수 있습니다. 이후 전체 프레임을 다운로드할 수 있습니다.

|   |   |   |
|---|---|---|
|[**영어**](/README.md)|[**한국어**](/docs/README_ko.md)|[**일본어**](/docs/README_jp.md)|
|   |   |   |

## 기능

- **카메라 스트리밍**: 카메라를 통해 실시간 비디오 스트림을 표시합니다.
- **사진 촬영**: 각 카메라에서 사진을 촬영하고 미리보기 기능을 제공합니다.
- **프레임 다운로드**: 선택한 모든 사진을 포함하는 프레임을 다운로드할 수 있습니다.
- **배경색 선택**: 사용자가 검은색 또는 흰색 배경을 선택할 수 있습니다.
- **카운트다운 및 플래시 효과**: 사진 촬영 시 카운트다운과 플래시 효과를 추가하여 촬영 경험을 개선합니다.

## 구성 파일

### 1. `Camera.tsx`
**역할**: 웹캠을 시작하고 비디오 스트림을 관리합니다.

**주요 기능**:
- `startCamera`: 사용자의 카메라를 활성화하고 스트림을 가져와 상위 컴포넌트에 전달합니다.
- 비디오 요소를 숨긴 상태로 스트림을 재생합니다.

### 2. `FrameSelect.tsx`
**역할**: 프레임 선택 UI를 제공합니다.

**주요 기능**:
- 드롭다운 메뉴에서 프레임을 선택할 수 있습니다.
- 선택된 프레임에 따라 `OneByTwoLayout`, `TwoByTwoLayout` 또는 `...` 등의 컴포넌트를 렌더링합니다.
- 선택된 프레임에 비디오 스트림을 전달합니다.

### 3. `LifePhoto.tsx`
**역할**: 전체 앱의 주요 컴포넌트로 카메라와 프레임 선택 기능을 통합합니다.

**주요 기능**:
- `videoSrc` 상태를 관리하여 카메라 스트림을 추적합니다.
- 각 사진을 찍고 미리보기로 보여줍니다.

### 4. `OneByTwoLayout.tsx`
**역할**: 1x4 형태의 프레임 레이아웃을 렌더링합니다.

**주요 기능**:
- 각 비디오 박스에 대해 개별적으로 카메라를 시작할 수 있도록 관리합니다.
- 비디오 스트림을 설정하고 클릭 시 카메라를 활성화합니다.
- 카운트다운과 플래시 효과를 통해 촬영 경험을 향상시킵니다.
- 각 카메라에서 사진을 찍고, 전체 프레임을 다운로드하는 버튼을 포함합니다.

## 사용 방법
1. 배경색을 선택하여 프레임의 배경색을 변경할 수 있습니다.
2. 각 박스를 클릭하여 해당 카메라에서 사진을 촬영합니다.
3. 촬영된 사진을 미리보고, `Download` 버튼을 클릭하여 모든 사진을 포함한 프레임을 다운로드합니다.

## 기술 스택
- [**React**](https://react.dev/)
- [**TypeScript**](https://www.typescriptlang.org/)
- [**Tailwind CSS**](https://tailwindcss.com/)
- [**html2canvas**](https://html2canvas.hertzen.com/)
- [**MediaDevices API**](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)

## 폴더 구조
```
/snap-frame
├── /app
│   ├── /components
│   │   ├── Camera.tsx
│   │   ├── FrameSelect.tsx
│   │   ├── LifePhoto.tsx
│   │   └── VideoBox.tsx
│   ├── /framelayout
│   │   ├── OneByTwoLayout.tsx
│   │   ├── TwoByTwoLayout.tsx
│   │   └── ...
│   ├── layout.tsx
│   └── page.tsx
├── package.json
├── README.md
└── ...
```

## 라이센스
이 프로젝트는 [MIT 라이센스](https://mit-license.org/) 하에 배포됩니다.
