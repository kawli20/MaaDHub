import { Component, ReactNode, ErrorInfo } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home, Trash2 } from "lucide-react";
import { Link } from "react-router";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleResetStorage = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // ignore
    }
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#030303]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg w-full text-center"
          >
            <div className="glass-panel p-8 rounded-3xl border border-white/[0.08] shadow-2xl backdrop-blur-xl">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#C1272D]/10 border border-[#C1272D]/20 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-[#C1272D]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Something went wrong
              </h2>
              <p className="text-white/50 text-sm mb-4 leading-relaxed">
                An unexpected error occurred while loading this page. You can try refreshing or resetting cached data.
              </p>

              {this.state.error && (
                <div className="mb-6 p-3 rounded-xl bg-black/40 border border-white/5 text-left overflow-auto max-h-32 text-xs font-mono text-red-400/90">
                  {this.state.error.message || String(this.state.error)}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={this.handleRetry}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#C1272D] text-white font-medium hover:bg-[#C1272D]/90 transition-colors shadow-lg shadow-[#C1272D]/20"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>

                <Link
                  to="/"
                  onClick={() => this.setState({ hasError: false, error: null })}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white font-medium hover:bg-white/10 transition-colors border border-white/10"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </Link>

                <button
                  onClick={this.handleResetStorage}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20 text-xs"
                  title="Clear corrupted cache and reload"
                >
                  <Trash2 className="w-4 h-4" />
                  Reset Cache
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
