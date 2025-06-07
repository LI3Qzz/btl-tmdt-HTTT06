import {FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsAsync, resetProductFetchStatus, selectProductFetchStatus, selectProductTotalResults, selectProducts } from '../ProductSlice'
import { ProductCard } from './ProductCard'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import { selectBrands } from '../../brands/BrandSlice'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { selectCategories } from '../../categories/CategoriesSlice'
import Pagination from '@mui/material/Pagination';
import { ITEMS_PER_PAGE } from '../../../constants'
import {createWishlistItemAsync, deleteWishlistItemByIdAsync, resetWishlistItemAddStatus, resetWishlistItemDeleteStatus, selectWishlistItemAddStatus, selectWishlistItemDeleteStatus, selectWishlistItems} from '../../wishlist/WishlistSlice'
import {selectLoggedInUser} from '../../auth/AuthSlice'
import {toast} from 'react-toastify'
import {banner1, banner2, banner3, banner4, loadingAnimation} from '../../../assets'
import { resetCartItemAddStatus, selectCartItemAddStatus } from '../../cart/CartSlice'
import { motion } from 'framer-motion'
import { ProductBanner } from './ProductBanner'
import Lottie from 'lottie-react'


const sortOptions=[
    {name:"Price: low to high",sort:"price",order:"asc"},
    {name:"Price: high to low",sort:"price",order:"desc"},
]


const bannerImages=[banner1,banner3,banner2,banner4]

export const ProductList = () => {
    const [filters,setFilters]=useState({brand: null, category: null})
    const [page,setPage]=useState(1)
    const [sort,setSort]=useState(null)
    const theme=useTheme()

    const is1200=useMediaQuery(theme.breakpoints.down(1200))
    const is800=useMediaQuery(theme.breakpoints.down(800))
    const is700=useMediaQuery(theme.breakpoints.down(700))
    const is600=useMediaQuery(theme.breakpoints.down(600))
    const is500=useMediaQuery(theme.breakpoints.down(500))
    const is488=useMediaQuery(theme.breakpoints.down(488))

    const brands=useSelector(selectBrands)
    const categories=useSelector(selectCategories)
    const products=useSelector(selectProducts)
    const totalResults=useSelector(selectProductTotalResults)
    const loggedInUser=useSelector(selectLoggedInUser)

    const productFetchStatus=useSelector(selectProductFetchStatus)

    const wishlistItems=useSelector(selectWishlistItems)
    const wishlistItemAddStatus=useSelector(selectWishlistItemAddStatus)
    const wishlistItemDeleteStatus=useSelector(selectWishlistItemDeleteStatus)

    const cartItemAddStatus=useSelector(selectCartItemAddStatus)

    const dispatch=useDispatch()

    const handleBrandFilters=(e)=>{
        setFilters({...filters, brand: e.target.value})
    }

    const handleCategoryFilters=(e)=>{
        setFilters({...filters, category: e.target.value})
    }

    useEffect(()=>{
        window.scrollTo({
            top:0,
            behavior:"instant"
        })
    },[])

    useEffect(()=>{
        setPage(1)
    },[totalResults])


    useEffect(()=>{
        const finalFilters={...filters}

        finalFilters['pagination']={page:page,limit:ITEMS_PER_PAGE}
        finalFilters['sort']=sort

        if(!loggedInUser?.isAdmin){
            finalFilters['user']=true
        }

        dispatch(fetchProductsAsync(finalFilters))
        
    },[filters,page,sort])


    const handleAddRemoveFromWishlist=(e,productId)=>{
        if(e.target.checked){
            const data={user:loggedInUser?._id,product:productId}
            dispatch(createWishlistItemAsync(data))
        }

        else if(!e.target.checked){
            const index=wishlistItems.findIndex((item)=>item.product && item.product._id===productId)
            dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
        }
    }

    useEffect(()=>{
        if(wishlistItemAddStatus==='fulfilled'){
            toast.success("Product added to wishlist")
        }
        else if(wishlistItemAddStatus==='rejected'){
            toast.error("Error adding product to wishlist, please try again later")
        }

    },[wishlistItemAddStatus])

    useEffect(()=>{
        if(wishlistItemDeleteStatus==='fulfilled'){
            toast.success("Product removed from wishlist")
        }
        else if(wishlistItemDeleteStatus==='rejected'){
            toast.error("Error removing product from wishlist, please try again later")
        }
    },[wishlistItemDeleteStatus])

    useEffect(()=>{
        if(cartItemAddStatus==='fulfilled'){
            toast.success("Product added to cart")
        }
        else if(cartItemAddStatus==='rejected'){
            toast.error("Error adding product to cart, please try again later")
        }
        
    },[cartItemAddStatus])

    useEffect(()=>{
        if(productFetchStatus==='rejected'){
            toast.error("Error fetching products, please try again later")
        }
    },[productFetchStatus])

    useEffect(()=>{
        return ()=>{
            dispatch(resetProductFetchStatus())
            dispatch(resetWishlistItemAddStatus())
            dispatch(resetWishlistItemDeleteStatus())
            dispatch(resetCartItemAddStatus())
        }
    },[])



  return (
    <>
    {/* filters side bar */}

    {
        productFetchStatus==='pending'?
        <Stack width={is500?"35vh":'25rem'} height={'calc(100vh - 4rem)'} justifyContent={'center'} marginRight={'auto'} marginLeft={'auto'}>
            <Lottie animationData={loadingAnimation}/>
        </Stack>
        :
        <>
        <Stack mb={'3rem'}>
            
                {/* banners section */}
                {
                    !is600 && 
                
                <Stack sx={{width:"100%",height:is800?"300px":is1200?"400px":"500px"}}>
                    <ProductBanner images={bannerImages}/>
                </Stack>
                }

                {/* filters and sort options */}
                <Stack flexDirection={is700?'column':'row'} justifyContent={'flex-end'} alignItems={is700?'flex-start':'center'} columnGap={5} rowGap={2} mr={is700?0:'2rem'}>

                    {/* brand filter */}
                    <Stack alignSelf={is700?'flex-start':'flex-end'} width={is700?'100%':'12rem'}>
                        <FormControl fullWidth>
                            <InputLabel id="brand-dropdown">Brand</InputLabel>
                            <Select
                                variant='standard'
                                labelId="brand-dropdown"
                                label="Brand"
                                onChange={handleBrandFilters}
                                value={filters.brand}
                            >
                                <MenuItem bgcolor='text.secondary' value={null}>Reset</MenuItem>
                                {
                                    brands?.map((brand)=>(
                                        <MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Stack>

                    {/* category filter */}
                    <Stack alignSelf={is700?'flex-start':'flex-end'} width={is700?'100%':'12rem'}>
                        <FormControl fullWidth>
                            <InputLabel id="category-dropdown">Category</InputLabel>
                            <Select
                                variant='standard'
                                labelId="category-dropdown"
                                label="Category"
                                onChange={handleCategoryFilters}
                                value={filters.category}
                            >
                                <MenuItem bgcolor='text.secondary' value={null}>Reset</MenuItem>
                                {
                                    categories?.map((category)=>(
                                        <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Stack>

                    {/* sort options */}
                    <Stack alignSelf={is700?'flex-start':'flex-end'} width={is700?'100%':'12rem'}>
                        <FormControl fullWidth>
                            <InputLabel id="sort-dropdown">Sort</InputLabel>
                            <Select
                                variant='standard'
                                labelId="sort-dropdown"
                                label="Sort"
                                onChange={(e)=>setSort(e.target.value)}
                                value={sort}
                            >
                                <MenuItem bgcolor='text.secondary' value={null}>Reset</MenuItem>
                                {
                                    sortOptions.map((option)=>(
                                        <MenuItem key={option.name} value={option}>{option.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Stack>
                
                </Stack>

                {/* products */}
                <Stack rowGap={5} mt={is600?2:0}>

                    {/* product grid */}
                    <Grid gap={is700?1:2} container justifyContent={'center'} alignContent={'center'}>
                        {
                            products.map((product)=>(
                                <ProductCard 
                                    key={product._id} 
                                    id={product._id} 
                                    title={product.title} 
                                    thumbnail={product.thumbnail} 
                                    brand={product.brand?.name || 'Unknown Brand'} 
                                    price={product.price} 
                                    handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
                                />
                            ))
                        }
                    </Grid>
                    
                    {/* pagination */}
                    <Stack alignSelf={is488?'center':'flex-end'} mr={is488?0:5} rowGap={2} p={is488?1:0}>
                        <Pagination size={is488?'medium':'large'} page={page}  onChange={(e,page)=>setPage(page)} count={Math.ceil(totalResults/ITEMS_PER_PAGE)} variant="outlined" shape="rounded" />
                        <Typography textAlign={'center'}>Showing {(page-1)*ITEMS_PER_PAGE+1} to {page*ITEMS_PER_PAGE>totalResults?totalResults:page*ITEMS_PER_PAGE} of {totalResults} results</Typography>
                    </Stack>    
                
                </Stack>
                
        </Stack>
        </>
    }

    </>
  )
}
