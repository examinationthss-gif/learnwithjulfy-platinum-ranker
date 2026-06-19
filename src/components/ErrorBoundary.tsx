"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in lesson rendering:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-3xl border border-rose-500/20 bg-rose-500/5 p-8 text-center max-w-xl mx-auto my-12 space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500 mx-auto">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h2 className="text-lg font-bold font-heading text-foreground">
            Something went wrong rendering this lesson
          </h2>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
            {this.state.error?.message || "An unexpected error occurred while loading this page."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 shadow-sm transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reload Lesson
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
