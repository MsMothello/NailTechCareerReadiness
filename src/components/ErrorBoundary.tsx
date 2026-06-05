import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Component error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#be185d' }}>
          <p style={{ fontSize: '18px', marginBottom: '12px' }}>
            Something went wrong loading this page.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              background: '#be185d',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
