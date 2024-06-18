import React, { useState } from 'react';
import { Container, Text, VStack, HStack, Button, Table, Thead, Tbody, Tr, Th, Td, Input, Select, useToast } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2023-10-01', amount: 200, type: 'Expense', category: 'Nike' },
    { id: 2, date: '2023-10-02', amount: 150, type: 'Income', category: 'Adidas' },
  ]);
  const [form, setForm] = useState({ id: null, date: '', amount: '', type: '', category: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (form.id) {
      setTransactions(transactions.map(t => t.id === form.id ? form : t));
      toast({ title: "Transaction updated.", status: "success", duration: 2000, isClosable: true });
    } else {
      setTransactions([...transactions, { ...form, id: Date.now() }]);
      toast({ title: "Transaction added.", status: "success", duration: 2000, isClosable: true });
    }
    setForm({ id: null, date: '', amount: '', type: '', category: '' });
  };

  const handleEdit = (transaction) => {
    setForm(transaction);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
    toast({ title: "Transaction deleted.", status: "error", duration: 2000, isClosable: true });
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Sneaker Accounting App</Text>
        <HStack spacing={4} width="100%">
          <Input placeholder="Date" name="date" value={form.date} onChange={handleChange} />
          <Input placeholder="Amount" name="amount" value={form.amount} onChange={handleChange} />
          <Select placeholder="Type" name="type" value={form.type} onChange={handleChange}>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </Select>
          <Select placeholder="Category" name="category" value={form.category} onChange={handleChange}>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Reebok">Reebok</option>
          </Select>
          <Button onClick={handleSubmit}>{form.id ? 'Update' : 'Add'}</Button>
        </HStack>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Category</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map(transaction => (
              <Tr key={transaction.id}>
                <Td>{transaction.date}</Td>
                <Td>{transaction.amount}</Td>
                <Td>{transaction.type}</Td>
                <Td>{transaction.category}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button size="sm" onClick={() => handleEdit(transaction)}><FaEdit /></Button>
                    <Button size="sm" onClick={() => handleDelete(transaction.id)}><FaTrash /></Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;