'use client';

interface IntroPreviewProps {
  text: string;
  showPlaceholder: boolean;
}

export default function IntroPreview({ text, showPlaceholder }: IntroPreviewProps) {
  return (
    <section className="rounded-2xl border-2 border-[#302B8F] bg-white p-4 shadow-sm sm:p-5" aria-labelledby="intro-preview-heading">
      <h2 id="intro-preview-heading" className="text-base font-bold text-[#1F1D3D]">
        영어 자기소개
      </h2>
      <div className="mt-3 min-h-[4.5rem] rounded-xl bg-[#FFF9E8]/80 px-3 py-3 text-sm leading-relaxed text-[#1F1D3D] sm:min-h-[5rem] sm:px-4 sm:py-4 sm:text-[0.9375rem]">
        {showPlaceholder ? (
          <p className="text-[#6F6A8A]">
            위 칸을 채우면 여기에 짧은 영어 자기소개가 나타나요. 비워도 기본 예시 문장이 표시됩니다.
          </p>
        ) : (
          <p className="whitespace-pre-wrap">{text}</p>
        )}
      </div>
    </section>
  );
}
