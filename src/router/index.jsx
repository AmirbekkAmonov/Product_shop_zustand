import React from 'react'
import { Route, Routes } from 'react-router'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import Add from '@/pages/NavPage/Add'
import Favorite from '@/pages/NavPage/Favorite'
import Basket from '@/pages/NavPage/Basket'
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'
import ProductList from '@/components/ProductList/ProductList'
import Profile from '@/pages/Profile'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<ProductList />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/add" element={<Add />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/basket' element={<Basket />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default Router