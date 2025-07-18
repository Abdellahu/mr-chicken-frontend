import './App.css'
import React, { createContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from "react-router";
import Header from "./Components/Header/Header";
import Menu from "./Components/Menu/Menu";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Contact from './Components/Contact/Contact';
import AdminHeader from './Components/Admin/AdminHeader';
import { Brightness } from './Components/Header/Brightness';
import Dishes from './Components/Admin/Dishes';
import Orders from './Components/Admin/Orders';
import FeedbackCollector from './Components/Admin/FeedbackCollector';
import SharedLayout from './Components/SharedLayout';
import SharedLayoutAdmin from './Components/SharedLayoutAdmin';
import Order from './Components/Menu/Order';
import DishDataProvider from './Components/Menu/DishDataProvider';
export const myCont = React.createContext();

function App({children}) {
  
  return (
    <DishDataProvider >  
       {children}
    <Brightness>  
        <Routes>
          <Route path='/' element={<SharedLayout /> }>
              <Route index element={<Home />}/> 
              <Route path="menu/" element={<Menu />}/> 
              <Route path="about/" element={<About />}/> 
              <Route path="contact/" element={<Contact />}/> 
              <Route path="order/" element={<Order />}/> 
          </Route>
          <Route path='/admin/' element={<SharedLayoutAdmin />}>
            <Route path="dishes/" element={<Dishes />}/> 
            <Route path="orders/" element={<Orders />}/> 
            <Route path="feedback/" element={<FeedbackCollector />}/> 
          </Route>
        </Routes>
      </Brightness>
  </DishDataProvider>
  );
}

export default App;
