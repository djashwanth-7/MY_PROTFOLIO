import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Trash2, Upload, User } from 'lucide-react';
import RevealSection from './RevealSection';
import { PROFILE } from '../data/portfolioData';

const STORAGE_KEY = 'dj_portfolio_profile_photo';

/**
 * Resizes an uploaded image client-side so large smartphone photos
 * store cleanly in localStorage without exceeding browser storage limits.
 */
function resizeImageToDataUrl(file: File, maxDimension = 720): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not process image.'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => reject(new Error('Invalid image file.'));
      img.src = String(reader.result);
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
}

export default function AboutSection() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [photoSrc, setPhotoSrc] = useState<string>(PROFILE.profilePhotoUrl);
  const [photoError, setPhotoError] = useState<string>('');

  useEffect(() => {
    if (PROFILE.profilePhotoUrl) {
      setPhotoSrc(PROFILE.profilePhotoUrl);
      return;
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPhotoSrc(saved);
      }
    } catch {
      // Ignore storage access errors in restricted environments
    }
  }, []);

  const handlePhotoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPhotoError('Please choose a valid image file (JPG, PNG, or WebP).');
      return;
    }

    setPhotoError('');
    try {
      const dataUrl = await resizeImageToDataUrl(file);
      setPhotoSrc(dataUrl);
      try {
        localStorage.setItem(STORAGE_KEY, dataUrl);
      } catch {
        setPhotoError('Photo loaded for this session, but could not be saved locally.');
      }
    } catch {
      setPhotoError('Could not load that image. Please try another file.');
    } finally {
      event.target.value = '';
    }
  };

  const handleRemovePhoto = () => {
    setPhotoSrc('');
    setPhotoError('');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <RevealSection
      id="about"
      className="border-t border-white/10 bg-[#080A0F]/85 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Heading + Profile Photo Slot */}
          <div className="lg:col-span-4">
            <p className="text-sm font-medium text-[#38BDF8]">Introduction</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              About Me
            </h2>

            <div className="mt-6 max-w-[240px]">
              <div className="aspect-square w-full overflow-hidden rounded-xl border border-white/15 bg-[#0D1017]">
                {photoSrc ? (
                  <img
                    src={photoSrc}
                    alt={`Portrait of ${PROFILE.displayName}`}
                    referrerPolicy="no-referrer"
                    onError={() => {
                      setPhotoSrc('');
                      setPhotoError('Photo failed to load.');
                    }}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#38BDF8]">
                      <User className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="mt-3 font-display text-sm font-semibold text-white">
                      {PROFILE.displayName}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">Add your portrait photo</p>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="sr-only"
                aria-label="Upload your profile photo"
              />

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-2 rounded-lg border border-white/15 bg-[#0D1017] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-[#38BDF8]/60 hover:bg-[#131823] whitespace-nowrap"
                >
                  <Upload className="h-3.5 w-3.5 text-[#38BDF8]" aria-hidden="true" />
                  <span>{photoSrc ? 'Change Photo' : 'Upload Photo'}</span>
                </button>

                {photoSrc && !PROFILE.profilePhotoUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    aria-label="Remove uploaded photo"
                    className="inline-flex min-h-[40px] items-center justify-center rounded-lg border border-white/15 bg-[#0D1017] px-2.5 py-1.5 text-xs text-slate-400 transition-colors hover:border-white/30 hover:text-white"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>

              {photoError && (
                <p className="mt-2 text-xs text-red-400" role="alert">
                  {photoError}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Narrative & Honest Summary */}
          <div className="lg:col-span-8">
            <div className="space-y-4 text-base leading-relaxed text-slate-200">
              <p>
                I am a first-semester B.Tech student at the beginning of my journey in computer
                science and artificial intelligence. Right now, my focus is on building a reliable
                foundation—learning Python programming and core web development step by step.
              </p>
              <p>
                Alongside coursework, I am exploring Generative AI at a beginner level and enjoy
                turning concepts into small, practical projects. To test what I learn in real
                problem-solving environments, I participate in hackathons and idea-thons where I can
                collaborate with peers and learn from building under constraints.
              </p>
              <p className="text-slate-400">
                My long-term goal is to grow into an AI Engineer through consistent practice,
                curiosity, and hands-on engineering.
              </p>
            </div>

            {/* Clean unboxed summary strip */}
            <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-medium text-slate-400">Current Stage</dt>
                <dd className="mt-1 text-sm font-semibold text-white">{PROFILE.status}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-slate-400">Core Learning</dt>
                <dd className="mt-1 text-sm font-semibold text-white">
                  Python &amp; Web Development
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-slate-400">Career Direction</dt>
                <dd className="mt-1 text-sm font-semibold text-white">{PROFILE.goal}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
