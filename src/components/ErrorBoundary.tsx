"use client";

import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <div className="w-px h-8 mx-auto mb-4" style={{ background: "#E5382A" }} />
          <p className="font-[family-name:var(--font-mono)] text-[8px] tracking-[0.16em] text-gold m-0 mb-2">
            ERROR
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-[21px] text-ink m-0 mb-3 font-normal">
            エラーが発生しました
          </h2>
          <p className="font-[family-name:var(--font-sans)] text-[12px] text-sub leading-[1.8] mb-6">
            ページの読み込みに問題がありました。
            <br />
            再読み込みをお試しください。
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="py-3 px-8 bg-accent text-white border-none rounded-md font-[family-name:var(--font-serif)] text-[14px] cursor-pointer"
          >
            再読み込み
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
