import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  Box, 
  Button, 
  Container, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Chip,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';

import Modal from '../home/Modal';

const Travel = () => {
  // Search states
  const [cities, setCities] = useState([]);
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [travelDate, setTravelDate] = useState(new Date());
  const [travelMode, setTravelMode] = useState('flight');
  
  // Results states
  const [searchResults, setSearchResults] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [travelers, setTravelers] = useState(1);
  
  // Booking states
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Modal states
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  
  // Stepper state
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Search', 'Select', 'Book', 'Confirm'];

  // Fetch cities on component mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cities');
        setCities(response.data);
      } catch (err) {
        setError('Failed to fetch cities');
      }
    };
    fetchCities();
  }, []);

  const handleSearch = async () => {
    if (!fromCity || !toCity) {
      setError('Please select both origin and destination');
      return;
    }

    setLoading(true);
    setError('');
    setSearchResults(null);
    setSelectedOption(null);
    setActiveStep(0);

    try {
      const response = await axios.post('http://localhost:3000/api/search', {
        from: fromCity,
        to: toCity,
        date: travelDate.toISOString().split('T')[0],
        mode: travelMode
      });
      setSearchResults(response.data);
      setIsResultsModalOpen(true);
      setActiveStep(1);
    } catch (err) {
      setError(err.response?.data?.error || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = async () => {
    if (!selectedOption) {
      setError('Please select an option first');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/book', {
        userId: 'user123',
        optionId: selectedOption.id,
        mode: travelMode,
        travelers: travelers,
        paymentInfo: {
          cardLast4: '4242',
          amount: calculateTotal()
        }
      });
      setBookingDetails(response.data);
      setIsBookingModalOpen(false);
      setIsConfirmationModalOpen(true);
      setActiveStep(3);
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!selectedOption) return 0;
    
    if (travelMode === 'train') {
      const selectedClass = selectedOption.classes.find(c => c.type === selectedOption.selectedClass);
      return selectedClass ? selectedClass.price * travelers : 0;
    }
    
    return selectedOption.price * travelers;
  };

  const renderFlightOption = (option) => (
    <Card 
      key={option.id} 
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        border: selectedOption?.id === option.id ? '2px solid' : '1px solid',
        borderColor: selectedOption?.id === option.id ? 'success.main' : 'divider',
        '&:hover': {
          boxShadow: 2
        }
      }}
      onClick={() => {
        setSelectedOption(option);
        setActiveStep(2);
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            {option.airline.name} - {option.flightNumber}
          </Typography>
          {selectedOption?.id === option.id && (
            <Chip label="Selected" color="success" size="small" />
          )}
        </Box>
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={4}>
            <Typography variant="body1" fontWeight="medium">
              {new Date(option.departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchResults.from.name}
            </Typography>
          </Grid>
          
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              {option.duration}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color={option.seatsAvailable < 10 ? 'error' : 'text.secondary'}>
              {option.seatsAvailable} seats left
            </Typography>
          </Grid>
          
          <Grid item xs={4} sx={{ textAlign: 'right' }}>
            <Typography variant="h6" color="success" fontWeight="bold">
              ₹{option.price.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              per traveler
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderTrainOption = (option) => (
    <Card 
      key={option.id} 
      sx={{ 
        mb: 2,
        border: selectedOption?.id === option.id ? '2px solid' : '1px solid',
        borderColor: selectedOption?.id === option.id ? 'success.main' : 'divider',
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            {option.trainName} (#{option.trainNumber})
          </Typography>
          {selectedOption?.id === option.id && (
            <Chip label="Selected" color="success" size="small" />
          )}
        </Box>
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={4}>
            <Typography variant="body1" fontWeight="medium">
              {new Date(option.departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchResults.from.name}
            </Typography>
          </Grid>
          
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              {option.duration}
            </Typography>
            <Divider sx={{ my: 1 }} />
          </Grid>
          
          <Grid item xs={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Class</InputLabel>
              <Select
                value={selectedOption?.id === option.id ? selectedOption.selectedClass : ''}
                onChange={(e) => {
                  const newOption = {
                    ...option,
                    selectedClass: e.target.value,
                    price: option.classes.find(c => c.type === e.target.value).price
                  };
                  setSelectedOption(newOption);
                  setActiveStep(2);
                }}
                label="Class"
              >
                {option.classes.map(cls => (
                  <MenuItem 
                    key={cls.type} 
                    value={cls.type}
                    disabled={!cls.available}
                  >
                    {cls.type} - ₹{cls.price.toLocaleString()}
                    {!cls.available && ' (Sold out)'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderBusOption = (option) => (
    <Card 
      key={option.id} 
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        border: selectedOption?.id === option.id ? '2px solid' : '1px solid',
        borderColor: selectedOption?.id === option.id ? 'success.main' : 'divider',
        '&:hover': {
          boxShadow: 2
        }
      }}
      onClick={() => {
        setSelectedOption(option);
        setActiveStep(2);
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            {option.operator} - {option.busType}
          </Typography>
          {selectedOption?.id === option.id && (
            <Chip label="Selected" color="success" size="small" />
          )}
        </Box>
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={4}>
            <Typography variant="body1" fontWeight="medium">
              {new Date(option.departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchResults.from.name}
            </Typography>
          </Grid>
          
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              {option.duration}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color={option.seatsAvailable < 10 ? 'error' : 'text.secondary'}>
              {option.seatsAvailable} seats left
            </Typography>
          </Grid>
          
          <Grid item xs={4} sx={{ textAlign: 'right' }}>
            <Typography variant="h6" color="success" fontWeight="bold">
              ₹{option.price.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              per traveler
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderCabOption = (option) => (
    <Card 
      key={option.id} 
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        border: selectedOption?.id === option.id ? '2px solid' : '1px solid',
        borderColor: selectedOption?.id === option.id ? 'success.main' : 'divider',
        '&:hover': {
          boxShadow: 2
        }
      }}
      onClick={() => {
        setSelectedOption(option);
        setActiveStep(2);
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            {option.provider} - {option.vehicleType}
          </Typography>
          {selectedOption?.id === option.id && (
            <Chip label="Selected" color="success" size="small" />
          )}
        </Box>
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Distance:</strong> {option.distance}
            </Typography>
            <Typography variant="body1">
              <strong>Duration:</strong> {option.estimatedDuration}
            </Typography>
          </Grid>
          
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            <Typography variant="h6" color="success" fontWeight="bold">
              ₹{option.price.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              for entire vehicle
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderPaymentForm = () => (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>Payment Information</Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Card Number"
            fullWidth
            placeholder="1234 5678 9012 3456"
            sx={{ mb: 2 }}
          />
        </Grid>
        
        <Grid item xs={6}>
          <TextField
            label="Expiry Date"
            fullWidth
            placeholder="MM/YY"
          />
        </Grid>
        
        <Grid item xs={6}>
          <TextField
            label="CVV"
            fullWidth
            placeholder="123"
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            label="Cardholder Name"
            fullWidth
            placeholder="John Doe"
            sx={{ mt: 2 }}
          />
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>        
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth sx={{ minWidth: 150 }}>
              <InputLabel>From</InputLabel>
              <Select
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                label="From"
              >
                {cities.map(city => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name} ({city.code})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FormControl fullWidth sx={{ minWidth: 150 }}>
              <InputLabel>To</InputLabel>
              <Select
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                label="To"
              >
                {cities.map(city => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name} ({city.code})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <DatePicker
              selected={travelDate}
              onChange={(date) => setTravelDate(date)}
              minDate={new Date()}
              customInput={
                <TextField 
                  fullWidth 
                  label="Travel Date" 
                  variant="outlined" 
                />
              }
            />
          </Grid>
          
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Mode</InputLabel>
              <Select
                value={travelMode}
                onChange={(e) => setTravelMode(e.target.value)}
                label="Mode"
              >
                <MenuItem value="flight">Flight</MenuItem>
                <MenuItem value="train">Train</MenuItem>
                <MenuItem value="bus">Bus</MenuItem>
                <MenuItem value="cab">Cab</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleSearch}
            disabled={loading || !fromCity || !toCity}
            size="large"
            sx={{ px: 5 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
          </Button>
        </Box>
        
        {error && (
          <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}
      </Paper>
      
      {/* Results Modal */}
      <Modal
        isOpen={isResultsModalOpen}
        onClose={() => setIsResultsModalOpen(false)}
        title={`Available ${travelMode}s from ${searchResults?.from.name} to ${searchResults?.to.name}`}
        maxWidth="lg"
      >
        <Box sx={{ maxHeight: '60vh', overflowY: 'auto', pr: 1 }}>
          {searchResults?.results.map(option => {
            switch(travelMode) {
              case 'flight': return renderFlightOption(option);
              case 'train': return renderTrainOption(option);
              case 'bus': return renderBusOption(option);
              case 'cab': return renderCabOption(option);
              default: return null;
            }
          })}
        </Box>
        
        {selectedOption && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setIsResultsModalOpen(false);
                setIsBookingModalOpen(true);
              }}
              sx={{ px: 4 }}
            >
              Continue to Booking
            </Button>
          </Box>
        )}
      </Modal>
      
      {/* Booking Modal */}
      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title="Complete Your Booking"
        maxWidth="md"
      >
        {selectedOption && (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: 'success.main' }}>
                  Travel Details
                </Typography>
                
                <Box sx={{ 
                  p: 2, 
                  bgcolor: 'grey.100', 
                  borderRadius: 1,
                  mb: 2
                }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {travelMode === 'flight' ? 
                      `${selectedOption.airline.name} (${selectedOption.flightNumber})` : 
                     travelMode === 'train' ? 
                      `${selectedOption.trainName} (${selectedOption.trainNumber})` : 
                     travelMode === 'bus' ? 
                      `${selectedOption.operator} (${selectedOption.busType})` : 
                      `${selectedOption.provider} (${selectedOption.vehicleType})`}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Route:</strong> {searchResults.from.name} to {searchResults.to.name}
                  </Typography>
                  
                  <Typography variant="body2">
                    <strong>Departure:</strong> {new Date(
                      travelMode === 'train' && selectedOption.selectedClass ? 
                      selectedOption.departure : 
                      selectedOption.departure
                    ).toLocaleString()}
                  </Typography>
                  
                  {travelMode === 'train' && selectedOption.selectedClass && (
                    <Typography variant="body2">
                      <strong>Class:</strong> {selectedOption.selectedClass}
                    </Typography>
                  )}
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: 'success.main' }}>
                  Price Details
                </Typography>
                
                <TextField
                  label="Number of Travelers"
                  type="number"
                  value={travelers}
                  onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                  fullWidth
                  margin="normal"
                  size="small"
                  sx={{ mb: 2 }}
                />
                
                <Box sx={{ 
                  p: 2, 
                  bgcolor: 'grey.100', 
                  borderRadius: 1
                }}>
                  <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography>Base Price:</Typography>
                    <Typography>₹{travelMode === 'train' ? 
                      selectedOption.classes.find(c => c.type === selectedOption.selectedClass)?.price.toLocaleString() : 
                      selectedOption.price.toLocaleString()}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography>Travelers:</Typography>
                    <Typography>x{travelers}</Typography>
                  </Box>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1" fontWeight="bold">Total:</Typography>
                    <Typography variant="subtitle1" fontWeight="bold" color="success">
                      ₹{calculateTotal().toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            
            {renderPaymentForm()}
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                color="success"
                onClick={() => setIsBookingModalOpen(false)}
                sx={{ mr: 2 }}
              >
                Back
              </Button>
              
              <Button
                variant="contained"
                color="success"
                onClick={handleBookNow}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirm Booking'}
              </Button>
            </Box>
          </>
        )}
      </Modal>
      
      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        title="Booking Confirmed!"
        maxWidth="sm"
        showCloseButton={false}
      >
        {bookingDetails && (
          <>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#4CAF50"/>
                <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
              <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                Thank you for your booking!
              </Typography>
              
              <Typography variant="body1" color="text.secondary">
                Your booking reference is: <strong>{bookingDetails.id}</strong>
              </Typography>
            </Box>
            
            <TableContainer>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell>
                      <Chip 
                        label={bookingDetails.status} 
                        color={bookingDetails.status === 'confirmed' ? 'success' : 'warning'} 
                        size="small" 
                      />
                    </TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell><strong>Booking Date</strong></TableCell>
                    <TableCell>{new Date(bookingDetails.bookingDate).toLocaleString()}</TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell><strong>Amount Paid</strong></TableCell>
                    <TableCell>₹{bookingDetails.paymentInfo.amount.toLocaleString()}</TableCell>
                  </TableRow>
                  
                  {bookingDetails.ticketNumber && (
                    <TableRow>
                      <TableCell><strong>Ticket Number</strong></TableCell>
                      <TableCell>{bookingDetails.ticketNumber}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  setIsConfirmationModalOpen(false);
                  setActiveStep(0);
                  setSelectedOption(null);
                }}
                sx={{ px: 5 }}
              >
                Done
              </Button>
            </Box>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default Travel;