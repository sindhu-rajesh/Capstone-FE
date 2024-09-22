// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table } from 'react-bootstrap';
// import LoadingComponent from '../message/LoadingComponent';
// import ErrorPage from '../message/ErrorPage';

// const QuoteTab = () => {
//   const [quotes, setQuotes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const user = JSON.parse(localStorage.getItem('currentUser'));
//   useEffect(() => {
//     const fetchQuotes = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get('https://capstone-be-1-r90x.onrender.com/api/quote/quote',{
//           headers: {
//               Authorization: `Bearer ${user.token}`, // Include the token in the request headers
//           },
          
//       });
//         setQuotes(response.data);
//       } catch (err) {
//         setError('Error fetching quotes');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuotes();
//   }, [user.token]);

//   return (
//     <div className="quote-tab-container">
//       <h2 className="text-center my-3">Quotes</h2>
//       {loading ? (
//         <p><LoadingComponent /></p>
//       ) : error ? (
//         <p><ErrorPage error ={error}/></p>
//       ) : (
//         <div className="table-responsive">
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>Serial No</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Service</th>
//                 <th>Availability</th>
//                 <th>Created At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {quotes.map((quote, index) => (
//                 <tr key={quote._id}>
//                   <td>{index + 1}</td>
//                   <td>{quote.name}</td>
//                   <td>{quote.email}</td>
//                   <td>{quote.phone}</td>
//                   <td>{quote.service}</td>
//                   <td>{quote.availability}</td>
//                   <td>{new Date(quote.createdAt).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuoteTab;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import LoadingComponent from '../message/LoadingComponent';
import ErrorPage from '../message/ErrorPage';

const QuoteTab = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newQuote, setNewQuote] = useState({ name: '', email: '', phone: '', service: '', availability: '' });
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://capstone-be-1-r90x.onrender.com/api/quote/', {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include the token in the request headers
          },
        });
        setQuotes(response.data);
      } catch (err) {
        setError('Error fetching quotes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [user.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQuote(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5174/api/quote', newQuote, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setQuotes(prevQuotes => [...prevQuotes, response.data]); // Add the new quote to the list
      setNewQuote({ name: '', email: '', phone: '', service: '', availability: '' }); // Reset form
    } catch (err) {
      setError('Error adding quote');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quote-tab-container">
      <h2 className="text-center my-3">Quotes</h2>
      {loading ? (
        <p><LoadingComponent /></p>
      ) : error ? (
        <p><ErrorPage error={error} /></p>
      ) : (
        <>
          <Form onSubmit={handleSubmit} className="mb-3">
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={newQuote.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={newQuote.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={newQuote.phone} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formService">
              <Form.Label>Service</Form.Label>
              <Form.Control type="text" name="service" value={newQuote.service} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formAvailability">
              <Form.Label>Availability</Form.Label>
              <Form.Control type="text" name="availability" value={newQuote.availability} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Add Quote</Button>
          </Form>
          <div className="table-responsive">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Serial No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Availability</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote, index) => (
                  <tr key={quote._id}>
                    <td>{index + 1}</td>
                    <td>{quote.name}</td>
                    <td>{quote.email}</td>
                    <td>{quote.phone}</td>
                    <td>{quote.service}</td>
                    <td>{quote.availability}</td>
                    <td>{new Date(quote.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default QuoteTab;
