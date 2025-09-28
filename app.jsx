import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "/components/ui/card";
import { Button } from "/components/ui/button";

const MidasBuyUCPurchase = () => {
  const [playerId, setPlayerId] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionComplete, setTransactionComplete] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  const ucPackages = [
    { id: 1, name: "60 UC", price: 0.99, ucAmount: 60, popular: false },
    { id: 2, name: "325 UC", price: 4.99, ucAmount: 325, popular: false },
    { id: 3, name: "660 UC", price: 9.99, ucAmount: 660, popular: true },
    { id: 4, name: "1800 UC", price: 24.99, ucAmount: 1800, popular: false },
    { id: 5, name: "3850 UC", price: 49.99, ucAmount: 3850, popular: false },
    { id: 6, name: "8100 UC", price: 99.99, ucAmount: 8100, popular: true }
  ];

  const paymentMethods = [
    { id: 'paypal', name: 'PayPal', icon: 'PP', color: 'bg-blue-500' },
    { id: 'visa', name: 'Visa', icon: 'VISA', color: 'bg-blue-600' },
    { id: 'mastercard', name: 'MasterCard', icon: 'MC', color: 'bg-red-500' },
    { id: 'bitcoin', name: 'Bitcoin', icon: '₿', color: 'bg-orange-500' }
  ];

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
  };

  const handlePayment = async () => {
    if (!playerId || !selectedPackage || !paymentMethod) {
      alert('Please fill all required fields: Player ID, UC Package, and Payment Method');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing with delay
    setTimeout(() => {
      setTransactionDetails({
        playerId,
        ucAmount: selectedPackage.ucAmount,
        price: selectedPackage.price,
        method: paymentMethod.name,
        transactionId: 'TRX-' + Math.floor(Math.random() * 1000000)
      });
      setIsProcessing(false);
      setTransactionComplete(true);
    }, 3000);
  };

  const resetTransaction = () => {
    setPlayerId('');
    setSelectedPackage(null);
    setPaymentMethod(null);
    setTransactionComplete(false);
    setTransactionDetails(null);
  };

  if (transactionComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="bg-green-500 p-6 rounded-lg shadow-2xl inline-block mb-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
              <p className="text-white opacity-90">UC has been added to your account</p>
            </div>
          </div>

          {/* Transaction Details */}
          <Card className="bg-gray-800 border-gray-700 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Transaction Details</CardTitle>
              <CardDescription className="text-center text-gray-400">
                Your purchase has been processed successfully
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                <div>
                  <div className="text-gray-400 mb-1">Transaction ID</div>
                  <div className="font-mono text-blue-400">{transactionDetails.transactionId}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Player ID</div>
                  <div className="font-bold">{transactionDetails.playerId}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">UC Amount</div>
                  <div className="font-bold text-yellow-400">{transactionDetails.ucAmount} UC</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Amount Paid</div>
                  <div className="font-bold text-green-400">${transactionDetails.price}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Payment Method</div>
                  <div className="font-bold">{transactionDetails.method}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Status</div>
                  <div className="font-bold text-green-400">Completed</div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-400 mb-4">
                  Please check your PUBG Mobile inventory. UC should be available within 5 minutes.
                </p>
                <Button
                  onClick={resetTransaction}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  Make Another Purchase
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
      {/* Loading Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold mb-2">Processing Payment</h2>
            <p className="text-gray-400">Please wait while we complete your transaction...</p>
            <div className="mt-4 text-sm text-gray-500">Do not refresh or close this page</div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-2xl mb-6">
            <img 
              src="https://placeholder-image-service.onrender.com/image/120x120?prompt=PUBG%20Mobile%20UC%20icon%20with%20gold%20coins%20and%20blue%20background&id=pubg-icon-1" 
              alt="PUBG Mobile UC icon with golden coins and blue background"
              className="w-24 h-24 mx-auto mb-4 rounded-full"
            />
            <h1 className="text-4xl font-bold mb-2">UC by GlitchX</h1>
            <p className="text-lg opacity-90">Purchase PUBG Mobile UC - Fast & Secure</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Player ID Section */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl">Enter Player ID</CardTitle>
              <CardDescription className="text-gray-400">
                Your PUBG Mobile Player ID (Numeric ID)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Enter your 10-digit Player ID"
                className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                maxLength={10}
              />
              <p className="text-sm text-gray-400 mt-2">
                Found in your PUBG Mobile profile settings
              </p>
            </CardContent>
          </Card>

          {/* UC Packages Section */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl">Select UC Package</CardTitle>
              <CardDescription className="text-gray-400">
                Choose your UC amount
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {ucPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-105 ${
                      selectedPackage?.id === pkg.id
                        ? 'border-blue-500 bg-blue-900 bg-opacity-30 shadow-lg'
                        : 'border-gray-600 hover:border-gray-500'
                    } ${pkg.popular ? 'ring-2 ring-yellow-400' : ''}`}
                    onClick={() => handlePackageSelect(pkg)}
                  >
                    {pkg.popular && (
                      <div className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full mb-2 text-center">
                        MOST POPULAR
                      </div>
                    )}
                    <div className="text-center">
                      <div className="font-bold text-lg mb-1">{pkg.name}</div>
                      <div className="text-yellow-400 font-bold text-xl">${pkg.price}</div>
                      <div className="text-sm text-gray-400">{pkg.ucAmount} UC</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods Section */}
          <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Payment Method</CardTitle>
              <CardDescription className="text-gray-400">
                Select your preferred payment method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-105 ${
                      paymentMethod?.id === method.id
                        ? 'border-blue-500 bg-blue-900 bg-opacity-30 shadow-lg'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => handlePaymentSelect(method)}
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-3 text-white text-2xl font-bold`}>
                        {method.icon}
                      </div>
                      <div className="font-semibold">{method.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          {selectedPackage && (
            <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-lg">
                  <div className="text-gray-400">Player ID:</div>
                  <div className="font-bold">{playerId || 'Not entered'}</div>
                  
                  <div className="text-gray-400">UC Package:</div>
                  <div className="font-bold text-yellow-400">
                    {selectedPackage?.name} (${selectedPackage?.price})
                  </div>
                  
                  <div className="text-gray-400">Payment Method:</div>
                  <div className="font-bold">
                    {paymentMethod?.name || 'Not selected'}
                  </div>
                  
                  <div className="text-gray-400">Total Amount:</div>
                  <div className="font-bold text-green-400">
                    ${selectedPackage?.price || '0.00'}
                  </div>
                </div>
                
                <Button
                  onClick={handlePayment}
                  disabled={!playerId || !selectedPackage || !paymentMethod || isProcessing}
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-bold disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : `Pay $${selectedPackage?.price || '0.00'}`}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400 text-sm">
          <p>© 2024 GlitchX UC Services. All rights reserved.</p>
          <p className="mt-2">This is a simulation for demonstration purposes only.</p>
        </div>
      </div>
    </div>
  );
};

export default MidasBuyUCPurchase;
