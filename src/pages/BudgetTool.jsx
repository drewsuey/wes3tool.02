// src/pages/BudgetTool.jsx
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import FormStep from '../components/FormStep';
import Chart from '../components/Chart';
import PDFExporter from '../components/PDFExporter';
import { generateEstimate } from '../utils/calculations';
import '../App.css';

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('BudgetTool Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <p>We're sorry, but there was an error processing your request.</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function BudgetTool() {
  const [data, setData] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);

  // Load saved form state on mount
  useEffect(() => {
    const savedState = localStorage.getItem('wes3FormState');
    if (savedState) {
      try {
        const { data, timestamp } = JSON.parse(savedState);
        const now = Date.now();
        // Check if saved state is less than 24 hours old
        if (now - timestamp < 24 * 60 * 60 * 1000) {
          setData(data);
          setLastSaved(new Date(timestamp));
        } else {
          localStorage.removeItem('wes3FormState');
        }
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  // Memoized data update handler
  const handleDataUpdate = useCallback(async (newData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const estimate = await generateEstimate(newData);
      const updatedData = {
        ...newData,
        ...estimate
      };
      
      setData(updatedData);
      setFormSubmitted(true);
      
      // Save form state
      localStorage.setItem('wes3FormState', JSON.stringify({
        data: updatedData,
        timestamp: Date.now()
      }));
      
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error generating estimate:', error);
      setError('Failed to generate estimate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Enhanced handlers with error handling
  const handleReset = useCallback(() => {
    try {
      localStorage.removeItem('wes3FormState');
      setFormSubmitted(false);
      setData({});
      setError(null);
      setLastSaved(null);
    } catch (error) {
      console.error('Error resetting form:', error);
      setError('Failed to reset form. Please refresh the page.');
    }
  }, []);

  const handlePrint = useCallback(() => {
    try {
      window.print();
    } catch (error) {
      console.error('Error printing:', error);
      setError('Failed to print. Please try again.');
    }
  }, []);

  const handleDownloadPDF = useCallback(async () => {
    try {
      setIsLoading(true);
      const exporter = new PDFExporter(data);
      await exporter.generatePDF();
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  const handleEmail = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3001/api/send-estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to send estimate');
      }

      const result = await response.json();
      alert('Estimate sent successfully to our sales team!');
    } catch (error) {
      console.error('Error sending estimate:', error);
      setError('Failed to send estimate. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  // Memoized result content with loading and error states
  const estimateResult = useMemo(() => (
    <div className="estimate-result">
      {error ? (
        <div className="error-message" role="alert">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={handleReset}>Try Again</button>
        </div>
      ) : (
        <>
          <h2>Device Estimate</h2>
          {lastSaved && (
            <p className="last-saved">
              Last saved: {lastSaved.toLocaleString()}
            </p>
          )}
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>Name: <strong>{data.name}</strong></p>
            <p>Company: <strong>{data.companyName}</strong></p>
            <p>Email: <strong>{data.email}</strong></p>
            {data.phone && <p>Phone: <strong>{data.phone}</strong></p>}
          </div>
          
          <div className="device-counts">
            <h3>Required Devices</h3>
            <p>Smoke Detectors: <strong>{data.deviceCounts?.smoke}</strong></p>
            <p>Heat Detectors: <strong>{data.deviceCounts?.heat}</strong></p>
            <p>Call Points: <strong>{data.deviceCounts?.callPoints}</strong></p>
            {data.interfaceIntegration && (
              <p>Interface Units: <strong>{data.deviceCounts?.interfaceUnits}</strong></p>
            )}
          </div>

          {data.deviceCounts?.spacing && (
            <div className="technical-details">
              <h3>Device Spacing Details</h3>
              <div className="spacing-info">
                <h4>Smoke Detectors</h4>
                <ul>
                  <li>Spacing between detectors: <strong>{data.deviceCounts.spacing.smoke.spacing.toFixed(2)} feet</strong></li>
                  <li>Distance from walls: <strong>{data.deviceCounts.spacing.smoke.wallDistance.toFixed(2)} feet</strong></li>
                </ul>
                <h4>Heat Detectors</h4>
                <ul>
                  <li>Spacing between detectors: <strong>{data.deviceCounts.spacing.heat.spacing.toFixed(2)} feet</strong></li>
                  <li>Distance from walls: <strong>{data.deviceCounts.spacing.heat.wallDistance.toFixed(2)} feet</strong></li>
                </ul>
              </div>
              {data.coverageDetails?.technicalExplanation && (
                <>
                  <h4>Technical Analysis</h4>
                  <p className="technical-explanation">
                    {data.coverageDetails.technicalExplanation}
                  </p>
                </>
              )}
            </div>
          )}

          <div className="chart-section">
            <Chart data={data} />
          </div>

          <div className="cta-buttons">
            <button 
              onClick={handlePrint}
              disabled={isLoading}
            >
              Print
            </button>
            <button 
              onClick={handleDownloadPDF}
              disabled={isLoading}
            >
              {isLoading ? 'Generating PDF...' : 'Download PDF'}
            </button>
            <button 
              onClick={handleEmail}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Email My Estimate'}
            </button>
            <button 
              onClick={handleReset}
              disabled={isLoading}
            >
              Start Over
            </button>
          </div>
        </>
      )}
    </div>
  ), [data, error, isLoading, lastSaved, handlePrint, handleDownloadPDF, handleEmail, handleReset]);

  return (
    <ErrorBoundary>
      <style>
        {`
          .technical-details {
            margin: 20px 0;
            padding: 20px;
            background: #f5f5f5;
            border-radius: 8px;
          }
          .spacing-info {
            margin: 15px 0;
            padding: 15px;
            background: white;
            border-radius: 4px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .spacing-info h4 {
            color: #2c3e50;
            margin: 10px 0;
          }
          .spacing-info ul {
            list-style: none;
            padding-left: 0;
            margin: 10px 0 20px;
          }
          .spacing-info li {
            margin: 8px 0;
            color: #34495e;
          }
          .technical-explanation {
            font-size: 14px;
            line-height: 1.6;
            color: #333;
            white-space: pre-wrap;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #ddd;
          }
        `}
      </style>
      <div className="budget-tool-hero">
        <div className="budget-overlay"></div>
        <div className="budget-content">
          <h1 className="budget-title">WES3 Budget Tool</h1>
          
          {isLoading && !formSubmitted && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
              <p>Calculating estimate...</p>
            </div>
          )}
    
          {!formSubmitted ? (
            <FormStep onUpdate={handleDataUpdate} />
          ) : (
            estimateResult
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default React.memo(BudgetTool);
