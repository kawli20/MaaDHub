import { Component, ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Link } from "react-router";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
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
            className="max-w-md w-full text-center"
          >
            <div className="glass-panel p-8 rounded-2xl border border-white/[0.08]">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#C1272D]/10 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-[#C1272D]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Something went wrong
              </h2>
              <p className="text-white/50 text-sm mb-6">
                An unexpected error occurred. Please try again or return to the home page.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={this.handleRetry}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#C1272D] text-white font-medium hover:bg-[#C1272D]/90 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white font-medium hover:bg-white/10 transition-colors border border-white/10"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
