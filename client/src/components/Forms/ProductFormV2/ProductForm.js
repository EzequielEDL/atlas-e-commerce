import React, { useState, useRef, useEffect } from 'react';

import {
  PriceIcon,
  ProductIcon,
  StockIcon,
  UploadIcon
} from '../../SvgIcons/IconsMaterial'

import {
  Grid,
  Typography,
  Button,
  Paper,
  GridList,
  GridListTile,
  GridListTileBar,
  TextField,
  Chip
} from  '@material-ui/core';
import ManProductSvg from '../../SvgIcons/ManProductSvg'
import { validations } from "../../../validations/product";
import useStyles from "./styles";


const ProductForm = ({ product, categoriesApi, handleFinalSubmit, init, applyChangeDisabled }) => {
  const submitRef = useRef();
  const imageRef = useRef();
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState(!!product ? (!!product.categories ? product.categories.map(e => e.id.toString()) : []) : []);

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    images: ""
  });

  const [input, setInput] = useState(!!product ? product : {
      name: "",
      description: "",
      price: "",
      stock: "",
      images: []
  });

  const uploadImages = file => {
    let aux = [];
    for (let i = 0; i < file.length; i++) aux[i] = URL.createObjectURL(file[i]);
    setImages(aux);
    console.log(aux)
  }

  const handleInputChange = event => {
    if (event.target.name === "images") {
      setInput({
        ...input,
        images: event.target.files
      })
      uploadImages(event.target.files);
    }else {
      setInput({
        ...input,
        [event.target.name]: event.target.value
      });
    }
  }

  const parseToString = array => {
    let string = "[";
    for (var i = 0; i < array.length; i++) {
      if (i !== array.length - 1) string += "\"" + array[i] + "\", ";
      else string += "\"" + array[i] + "\"]";
    }
    return string;
  }

  /*const cleanInput = event => {
    setInput({
        name: "",
        description: "",
        price: "",
        stock: "",
        images: []
    });
    setErrors({
      name: "",
      description: "",
      price: "",
      stock: "",
      images: ""
    });
  }*/

  const handleSubmit = event => {
    event.preventDefault();
    setErrors(validations({
      ...input,
      [event.target.name]: event.target.value
    }));

    if(
      errors.name.length < 1 &
      errors.description < 1 &
      errors.price < 1 &
      errors.stock < 1 &
      errors.images < 1 &
      categories.length > 0
    ){
      const formData = new FormData(event.currentTarget);
      console.log(event.currentTarget)
      if (product) formData.append("oldImages", parseToString(product.images));
      handleFinalSubmit(formData, categories)
    }
  }

  const handleCategory = event => {
    if (event.target.checked) setCategories([ ...categories, event.target.id])
    else setCategories(categories.filter(c => c !== event.target.id))
  }

  useEffect(() => {
    const setStateCheckbox = () => {
      if(categoriesApi.length > 0 && product && product.hasOwnProperty("categories")){
        product.categories.forEach(category => {
          document.getElementById(category.id).checked = true;
        });
      }
    }
    setStateCheckbox();
  }, [categoriesApi, product])

  const RightContent = (
    <Grid item container xs={12} direction="column" justify="space-between" alignContent="space-between">
      <Grid item>
        <ManProductSvg width={"100%"} height={"100%"}/>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" color="textSecondary">An administrator can add or edit all the products he want, from telescopes to books or even merchandising.</Typography>
      </Grid>
        <Grid item >
          <Button 
            onClick={() => submitRef.current.click()} 
            variant='contained' 
            color='secondary' 
            type='submit'
            disabled={applyChangeDisabled}
            className={classes.button}
          >
            {init.button}
          </Button>
        </Grid>
    </Grid>
  );

  const LeftContent = (
    <Grid item container xs={12} direction="column" justify="flex-start">
      <form className={classes.formControl} onSubmit={handleSubmit}>
          <div className={classes.boxField}>
            <TextField
              variant='outlined'
              className={`${classes.textField} ${classes.textFieldHalf}`}
              icon={ProductIcon}
              type="text"
              value={input.name}
              error={!!errors.name}
              name="name"
              onChange={handleInputChange}
              placeholder="Name"
              InputProps={{
                endAdornment: <ProductIcon className={classes.icon}/>,
                min: "0",
                max: "20",
                maxLength: "20",
              }}
            />
            <TextField
              variant='outlined'
              className={`${classes.textField} ${classes.textFieldHalf}`}
              type="number"
              name="price"
              value={input.price}
              error={!!errors.price}
              onChange={handleInputChange}
              placeholder="Price"
              InputProps={{
                endAdornment: <PriceIcon className={classes.icon}/>,
                min: "0",
                max: "10",
                maxLength: "10",
              }}
            />
          </div>
          <div className={classes.boxField}>
            <TextField
              variant='outlined'
              className={`${classes.textField} ${classes.textFieldHalf}`}
              type="number"
              name="stock"
              value={input.stock}
              error={!!errors.stock}
              onChange={handleInputChange}
              placeholder="Stock"
              InputProps={{
                endAdornment: <StockIcon className={classes.icon}/>
              }}
            />

            <Button
              onClick={() => imageRef.current.click()}
              variant='contained'
              color='primary'
              className={`${classes.textField} ${classes.textFieldHalf}`}
              endIcon={<UploadIcon />}
            >
              UPLOAD IMAGES
            </Button>

            <input
              style={{display: "none"}}
              ref={imageRef}
              type="file"
              id="images"
              name="images"
              onChange={handleInputChange}
              multiple="multiple"
            />
          </div>
          <Grid item className={classes.textField}>
            <TextField
              fullWidth
              variant='outlined'
              multiline
              rows={4}
              type="text"
              name="description"
              value={input.description}
              error={!!errors.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
          </Grid>

          <Grid item container direction="column">
            <Grid item style={{margin: "8px"}}>
              <Typography color="textSecondary" variant="h6" styles={{padding: "0px"}}>Categories</Typography>
            </Grid>
            <Grid item container direction="row">
              {categoriesApi.length > 0
                ?(
                  <>
                  {categoriesApi.map(c => (
                    <Grid item key={c.id} style={{margin: "8px"}}>
                        <input
                            id={c.id}
                            type="checkbox"
                            style={{display: "none"}}
                            onChange={handleCategory}
                        />
                        <label htmlFor={c.id}>
                          <Chip
                            clickable
                            size="medium"
                            variant="default"
                            label={c.name}
                            color={categories.findIndex(e => e === c.id.toString()) !== -1 ? "primary" : "default"}
                          />
                        </label>
                    </Grid>
                  ))
                  }
                  </>
                )
                :(
                  <Typography color="textSecondary" variant="subtitle1" >Need a least a category !!</Typography>
                )
              }
            </Grid>
          </Grid>

          <input ref={submitRef} type="submit" id="submitForm" name="submitForm" style={{display: "none"}}/>

          <GridList className={classes.gridList} cols={4}>
            {images.map((image, index) => (
              <GridListTile key={index} className={classes.listTile}>
                <img src={image} alt="" />
                  <GridListTileBar
                    title={image}
                    classes={{ root: classes.titleBar, title: classes.title, }} />
              </GridListTile>
            ))}
          </GridList>

      </form>
    </Grid>
  );

  return (
    <Grid item container xs={12}>
      <Grid item xs={12}>

        <Paper className={classes.body}>
          <Grid item xs={12} align="center">
            <div className={classes.header}>
              <Typography variant="h6" styles={{padding: "0px"}}>{init.title}</Typography>
            </div>
          </Grid>
          <Grid item container>

            <Grid item container xs={8} className={classes.bodyLeft} >
              {LeftContent}
            </Grid>
            <Grid item container xs={4} className={classes.bodyRight}>
              {RightContent}
            </Grid>

          </Grid>
        </Paper>

      </Grid>
    </Grid>
  );
};

export default ProductForm;
