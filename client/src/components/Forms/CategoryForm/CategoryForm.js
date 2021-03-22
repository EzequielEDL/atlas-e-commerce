import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Divider,
  FormControl,
  Grid,
  Select,
  InputLabel,
  TextField,
  Card,
  CardContent,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import AdminNavbar from '../../Admin/AdminNavBar';

import useStyles from "./styles";

import {
  getCategories as getCategoriesApi,
  createCategory,
  deleteCategory,
  updateCategory
} from '../../../controllers/categories';


const CategoryForm = () => {
  //styles
  const classes = useStyles();

  const GlobalCss = withStyles({
    "@global": {
      ".MuiOutlinedInput-root": {
        backgroundColor: "rgba(0,0,0,0.1)",
      },
    },
  })(() => null);

  //-------------------------------------//

  const [input, setInput] = useState({
    name: "",
    description: "",
  });

  const [inputEdit, setInputEdit] = useState({
    name: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");
  const [okMessage, setOkMessage] = useState("");

  const [errorMessageDelete, setErrorMessageDelete] = useState("");
  const [okMessageDelete, setOkMessageDelete] = useState("");

  const [errorMessageEdit, setErrorMessageEdit] = useState("");
  const [okMessageEdit, setOkMessageEdit] = useState("");

  const getCategories = () => {
    getCategoriesApi()
    .then(data => {
        setCategories(data);
    })
    .catch(err => {
        console.log(err.message);
    })
  };

  //get categories
  useEffect(() => {
    getCategories();
  }, []);

  //input handler
  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
  };

  const handleInputEdit = (e) => {
    setInputEdit({
      ...inputEdit,
      [e.target.id]: e.target.value,
    });
  };

  const resetInputs = () => {
    setInput({
      name: '',
      description: '',
    });
  };

  const resetInputEdit = () => {
    setInputEdit({
      name: '',
      description: ''
    })
  }

  //creates category
  const handleCreate = (e) => {
    e.preventDefault();

    createCategory(input)
    .then(() => {
      resetInputs();
      setOkMessage("Category was created successfully");
      getCategories();
    })
    .catch(err => {
      setErrorMessage("Something went wrong...couldnt create category");
    })
  };

  //select a category
  const handleSelectChange = (e) => {
    let idx = e.target.selectedIndex;
    //category id
    let category = e.target.options[idx].id;
    setCategoryId(category);
  };

  // Delete category
  const handleDelete = (e) => {
    e.preventDefault();

    deleteCategory(categoryId)
    .then(() => {
      setOkMessageDelete("Category was deleted successfully");
      getCategories();
    })
    .catch(err => {
      setErrorMessageDelete("Something went wrong...couldnt delete category");
    })
  };

  // Edit selected category
  const handleEdit = (event) => {
    event.preventDefault();

    updateCategory(categoryId, inputEdit)
    .then(() => {
      setOkMessageEdit("Category was edited successfully");
      getCategories();
      resetInputEdit();
    })
    .catch(err => {
      setErrorMessageEdit("Something went wrong...couldnt edit category");
    })
  };

  const Content = (
    <>
      <GlobalCss />
      <Grid container xs={8} className={classes.root}>
        <Grid item className={classes.grid}>
          <Card elevation={4}>
            <Grid
              container
              spacing={4}
              alignItems='center'
              justify='center'
              maxWidth='100%'>
              <Grid item xs={8}>
                <CardContent>
                  <Grid
                    container
                    direction='column'
                    spacing={5}
                    className={classes.grid}>
                    <Grid item className={classes.titleSection}>
                      <Typography variant='h5'>CATEGORIES SETTING</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant='h6'>CREATE CATEGORY</Typography>
                    </Grid>
                    <FormControl className={classes.formControl}>
                      <TextField
                        placeholder='Category name'
                        onChange={handleInputChange}
                        value={input.name}
                        id='name'
                        label='Category name'
                        className={classes.input}
                        variant='outlined'
                      />
                      <Divider />
                      <TextField
                        multiline
                        rows={4}
                        placeholder='Description'
                        onChange={handleInputChange}
                        value={input.description}
                        id='description'
                        label='Category description'
                        className={classes.input}
                        variant='outlined'
                      />
                      <Divider />
                      <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        onClick={handleCreate}>
                        Create Category
                      </Button>
                      {errorMessage && (
                        <p style={{color: '#ef5350'}}>{errorMessage}</p>
                      )}
                      {okMessage && (
                        <p style={{color: '#aed581'}}>{okMessage}</p>
                      )}
                    </FormControl>
                  </Grid>
                </CardContent>
              </Grid>

              <Grid item xs={8}>
                <CardContent>
                  <Grid
                    container
                    direction='column'
                    spacing={5}
                    className={classes.grid}>
                    <Grid item>
                      <Typography variant='h6'>DELETE CATEGORY</Typography>
                    </Grid>
                    <FormControl className={classes.formControl}>
                      <InputLabel variant='outlined'>
                        --- Select category ---
                      </InputLabel>
                      <Select
                        native
                        onChange={handleSelectChange}
                        color='secondary'
                        className={classes.input}
                        variant='outlined'
                        >
                        <option aria-label='None' value='' />
                        {categories.map((category) => {
                          return (
                            <option id={category.id} key={category.id}>
                              {category.name}
                            </option>
                          );
                        })}
                      </Select>
                      <Divider />
                      <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        onClick={handleDelete}>
                        Delete Category
                      </Button>
                      {errorMessageDelete && (
                        <p style={{color: '#ef5350'}}>{errorMessageDelete}</p>
                      )}
                      {okMessageDelete && (
                        <p style={{color: '#aed581'}}>{okMessageDelete}</p>
                      )}
                    </FormControl>
                  </Grid>
                </CardContent>
              </Grid>

              <Grid item xs={8}>
                <CardContent>
                  <Grid
                    container
                    direction='column'
                    spacing={5}
                    className={classes.grid}>
                    <Grid item>
                      <Typography variant='h6'>EDIT CATEGORY</Typography>
                    </Grid>

                    <FormControl className={classes.formControl}>
                      <InputLabel variant='outlined'>
                        --- Select category ---
                      </InputLabel>
                      <Select
                        native
                        onChange={handleSelectChange}
                        color='secondary'
                        className={classes.input}
                        variant='outlined'
                        >
                        <option aria-label='None' value='' />
                        {categories.map((category) => {
                          return (
                            <option id={category.id} key={category.id}>
                              {category.name}
                            </option>
                          );
                        })}
                      </Select>
                      <Divider />
                      <TextField
                        placeholder='Category name'
                        onChange={handleInputEdit}
                        value={inputEdit.name}
                        id='name'
                        label='Category name'
                        width={300}
                        className={classes.input}
                        variant='outlined'
                      />
                      <Divider />
                      <TextField
                        multiline
                        rows={4}
                        placeholder='Description'
                        onChange={handleInputEdit}
                        value={inputEdit.description}
                        id='description'
                        label='Category description'
                        width={300}
                        className={classes.input}
                        variant='outlined'
                      />
                      <Divider />
                      <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        onClick={handleEdit}>
                        Edit Category
                      </Button>
                      {errorMessageEdit && (
                        <p style={{color: '#ef5350'}}>{errorMessageEdit}</p>
                      )}
                      {okMessageEdit && (
                        <p style={{color: '#aed581'}}>{okMessageEdit}</p>
                      )}
                    </FormControl>
                  </Grid>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item xs={false} sm={1} xl={2}/>
        <Grid item xs={1} sm={1} xl={1} style={{paddingRight: "16px"}}>
          <AdminNavbar />
        </Grid>
        <Grid item xs={11} sm={9} xl={7} style={{margin: "32px 0px"}}>
          {Content}
        </Grid>
        <Grid item xs={false} sm={1} xl={2}/>
      </Grid>
    </Grid>
  );

};

export default CategoryForm;
