import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error occurred:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
        return (
            <h1
              style={{ color: 'red', fontSize: '24px', textAlign: 'center', marginTop: '20px' }}
            >
              Something went wrong. Please Try Again Later.
            </h1>
          );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;