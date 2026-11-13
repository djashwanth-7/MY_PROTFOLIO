import { useEffect, useState } from 'react';
import { Check, Copy, ExternalLink, Github, RotateCcw, X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

function VoterDemo() {
  const [ageInput, setAgeInput] = useState('18');
  const [isCitizen, setIsCitizen] = useState(true);

  const parsedAge = Number(ageInput);
  const isValidAge =
    ageInput.trim() !== '' && !Number.isNaN(parsedAge) && Number.isInteger(parsedAge);

  let statusTitle = '';
  let statusMessage = '';
  let isEligible = false;

  if (!isValidAge || parsedAge < 0 || parsedAge > 130) {
    statusTitle = 'Invalid Age';
    statusMessage = 'Please enter a valid whole number age between 0 and 130.';
  } else if (!isCitizen) {
    statusTitle = 'Not Eligible';
    statusMessage = 'Eligibility requires meeting citizenship conditions in addition to minimum age.';
  } else if (parsedAge >= 18) {
    isEligible = true;
    statusTitle = 'Eligible to Vote';
    statusMessage = `At age ${parsedAge}, the minimum voting age requirement (18+) is satisfied.`;
  } else {
    const yearsLeft = 18 - parsedAge;
    statusTitle = 'Not Eligible Yet';
    statusMessage = `Minimum voting age is 18. Eligible in ${yearsLeft} year${yearsLeft === 1 ? '' : 's'}.`;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="voter-age-input" className="block text-sm font-medium text-white">
            Enter Age (years)
          </label>
          <input
            id="voter-age-input"
            type="number"
            min={0}
            max={130}
            value={ageInput}
            onChange={(e) => setAgeInput(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#050507] px-3 py-2 text-sm text-white tabular-nums"
          />
        </div>

        <div className="flex items-end pb-2">
          <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm font-medium text-slate-200">
            <input
              type="checkbox"
              checked={isCitizen}
              onChange={(e) => setIsCitizen(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-[#050507] text-[#2563EB]"
            />
            <span>Citizenship condition met</span>
          </label>
        </div>
      </div>

      <div
        className={`rounded-lg border p-4 ${
          isEligible
            ? 'border-[#3B82F6]/40 bg-[#2563EB]/10'
            : 'border-white/10 bg-[#050507]'
        }`}
      >
        <p className="text-sm font-semibold text-white">{statusTitle}</p>
        <p className="mt-1 text-sm text-slate-300">{statusMessage}</p>
      </div>
    </div>
  );
}

function AtmDemo() {
  const [balance, setBalance] = useState(5000);
  const [amountInput, setAmountInput] = useState('500');
  const [feedback, setFeedback] = useState('Ready for transaction.');
  const [history, setHistory] = useState<string[]>([
    'Initial account balance: ₹5,000.00',
  ]);

  const handleDeposit = () => {
    const amount = Number(amountInput);
    if (Number.isNaN(amount) || amount <= 0) {
      setFeedback('Enter a deposit amount greater than zero.');
      return;
    }
    const nextBalance = balance + amount;
    setBalance(nextBalance);
    setFeedback(`Deposited ₹${amount.toLocaleString('en-IN')}.`);
    setHistory((prev) => [
      `Deposit +₹${amount.toLocaleString('en-IN')} → Balance ₹${nextBalance.toLocaleString('en-IN')}`,
      ...prev.slice(0, 4),
    ]);
  };

  const handleWithdraw = () => {
    const amount = Number(amountInput);
    if (Number.isNaN(amount) || amount <= 0) {
      setFeedback('Enter a withdrawal amount greater than zero.');
      return;
    }
    if (amount > balance) {
      setFeedback('Insufficient balance for this withdrawal.');
      return;
    }
    const nextBalance = balance - amount;
    setBalance(nextBalance);
    setFeedback(`Withdrew ₹${amount.toLocaleString('en-IN')}.`);
    setHistory((prev) => [
      `Withdraw -₹${amount.toLocaleString('en-IN')} → Balance ₹${nextBalance.toLocaleString('en-IN')}`,
      ...prev.slice(0, 4),
    ]);
  };

  const handleReset = () => {
    setBalance(5000);
    setAmountInput('500');
    setFeedback('Account reset to ₹5,000.');
    setHistory(['Initial account balance: ₹5,000.00']);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#050507] p-4">
        <div>
          <p className="text-xs font-medium text-slate-400">Available Balance</p>
          <p className="mt-0.5 font-mono text-xl font-bold tabular-nums text-white">
            ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/15 bg-[#0D1017] px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-white/30 hover:text-white"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Reset</span>
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="atm-amount-input" className="block text-sm font-medium text-white">
            Transaction Amount (₹)
          </label>
          <input
            id="atm-amount-input"
            type="number"
            min={1}
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#050507] px-3 py-2 text-sm text-white tabular-nums"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDeposit}
            className="min-h-[40px] rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3B82F6] whitespace-nowrap"
          >
            Deposit
          </button>
          <button
            type="button"
            onClick={handleWithdraw}
            className="min-h-[40px] rounded-lg border border-white/15 bg-[#121622] px-4 py-2 text-sm font-semibold text-white hover:border-white/30 whitespace-nowrap"
          >
            Withdraw
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-200">{feedback}</p>

      <div className="border-t border-white/10 pt-3">
        <p className="text-xs font-medium text-slate-400">Recent Activity</p>
        <ul className="mt-2 space-y-1 font-mono text-xs tabular-nums text-slate-400">
          {history.map((entry, idx) => (
            <li key={`${entry}-${idx}`}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function GradeDemo() {
  const [marksInput, setMarksInput] = useState('84');
  const marks = Number(marksInput);
  const isValid = marksInput.trim() !== '' && !Number.isNaN(marks) && marks >= 0 && marks <= 100;

  let grade = '—';
  let remark = 'Enter marks between 0 and 100 to calculate the grade.';

  if (isValid) {
    if (marks >= 90) {
      grade = 'A+';
      remark = 'Outstanding performance (90–100)';
    } else if (marks >= 80) {
      grade = 'A';
      remark = 'Excellent performance (80–89)';
    } else if (marks >= 70) {
      grade = 'B';
      remark = 'Good performance (70–79)';
    } else if (marks >= 60) {
      grade = 'C';
      remark = 'Satisfactory performance (60–69)';
    } else if (marks >= 50) {
      grade = 'D';
      remark = 'Pass threshold met (50–59)';
    } else {
      grade = 'F';
      remark = 'Needs improvement (below 50)';
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="grade-marks-input" className="block text-sm font-medium text-white">
          Student Marks (0 – 100)
        </label>
        <input
          id="grade-marks-input"
          type="number"
          min={0}
          max={100}
          value={marksInput}
          onChange={(e) => setMarksInput(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#050507] px-3 py-2 text-sm text-white tabular-nums sm:max-w-xs"
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#050507] p-4">
        <div>
          <p className="text-xs font-medium text-slate-400">Calculated Result</p>
          <p className="mt-1 text-sm text-slate-200">{remark}</p>
        </div>
        <div className="font-display text-2xl font-bold tabular-nums text-[#38BDF8]">
          {grade}
        </div>
      </div>
    </div>
  );
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setActiveTab('demo');
    setCopied(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(project.pythonCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0D1017] p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#38BDF8]">
              {project.technologies.join(' · ')}
            </p>
            <h3
              id="project-modal-title"
              className="mt-1 font-display text-xl font-bold text-white sm:text-2xl"
            >
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>

        {/* Functional Tab Switcher */}
        <div className="mt-6 flex items-center gap-1 rounded-lg bg-[#050507] p-1 border border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('demo')}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'demo'
                ? 'bg-[#161B28] text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Interactive Simulation
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'code'
                ? 'bg-[#161B28] text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Python Logic
          </button>
        </div>

        <div className="mt-6">
          {activeTab === 'demo' ? (
            <>
              {project.id === 'voter' && <VoterDemo />}
              {project.id === 'atm' && <AtmDemo />}
              {project.id === 'grade' && <GradeDemo />}
            </>
          ) : (
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">
                  Reference Python implementation
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-white/15 bg-[#050507] px-3 py-1 text-xs font-medium text-slate-200 hover:border-white/30 hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#38BDF8]" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-xl border border-white/10 bg-[#050507] p-4 font-mono text-xs leading-relaxed text-slate-200">
                <code>{project.pythonCode}</code>
              </pre>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-[#38BDF8] hover:underline"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            <span>Open GitHub Placeholder</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] rounded-lg border border-white/15 bg-[#121622] px-4 py-2 text-sm font-medium text-white hover:border-white/30"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
