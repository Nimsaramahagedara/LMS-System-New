import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import WelcomeCardTeacher from "../../components/WelcomeCardTeacher";

const Chat = () => {
  const [isLoading, setIsLoading] = useState(true);

  const data = [
    {
      firstName: 'John',
      lastName: 'Peter',
      email: 'email@gmail.com',
      title: 'This is a Sample title',
      message: 'This is a Sample message'
    },
    {
      firstName: 'John',
      lastName: 'Peter',
      email: 'email@gmail.com',
      title: 'This is a Sample title'
    },
    {
      firstName: 'John',
      lastName: 'Peter',
      email: 'email@gmail.com',
      title: 'This is a Sample title'
    }
  ];

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <div>
        {isLoading ? <Loader /> : null}
        <WelcomeCardTeacher />
      </div>
      <div className="text-center font-bold">
        <h2 className="text-3xl">Messages From Students</h2>
      </div>
      <br></br>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1"><strong>Name</strong></Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1"><strong>Email</strong></Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1"><strong>Title</strong></Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1"><strong>Message</strong></Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{`${item.firstName} ${item.lastName}`}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.message || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Chat;
