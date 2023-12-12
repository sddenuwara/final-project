import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

class ConfigurePage extends React.Component {

  constructor() {
    super();
    this.state = {
      budgetData: {
        total: 0,
        categories: []
      }
    };
    this.editBudgetData = {
      total: 0,
      categories: []
    };
  }

  editCategory = (categoryName) => {
    const prevData = {
      total: this.state.budgetData.total,
      categories: this.state.budgetData.categories
    }

    const newCategory = this.editBudgetData.categories.find(category => category.name === categoryName)

    prevData.categories.find(category => category.name === categoryName).name = newCategory.name;
    prevData.categories.find(category => category.name === categoryName).price = newCategory.price;

    prevData.total = 0;
    prevData.categories.forEach((category) => {
      prevData.total += Number(category.price)
    })

    this.setState({ budgetData: prevData })
  }

  deleteCategory = (categoryName) => {
    const prevData = {
      total: this.editBudgetData.total,
      categories: this.editBudgetData.categories
    }

    const deletedCategory = prevData.categories.find(category => category.name === categoryName)
    prevData.total = prevData.total - deletedCategory.price;
    prevData.categories = prevData.categories.filter(category => category.name !== categoryName)
    this.editBudgetData = prevData;
    this.setState({ budgetData: prevData }) 
  }

  changeName = (newName, category) => {
    // Find category and edit it 
    console.log(newName)
    this.editBudgetData.categories.forEach((existingCategory) => {
      if (existingCategory.name === category.name) {
        existingCategory.name = newName;
      }
    })
  }

  changePrice = (newPrice, category) => {
    this.editBudgetData.categories.forEach((existingCategory) => {
      if (existingCategory.name === category.name) {
        existingCategory.price = newPrice;
      }
    });
  }

  configure = () => {
    const token = localStorage.getItem('jwt');
    const updatedBudget = this.state.budgetData;
    axios.post('https://monkfish-app-3ps63.ondigitalocean.app/api/budget/update', { token, updatedBudget})
      .then(response => {
        if (response && response.data && response.data.success) {
          useNavigate('/dashboard')
        }
      })
  }

  getBudget = () => {
    const token = localStorage.getItem('jwt');
    axios.post('https://monkfish-app-3ps63.ondigitalocean.appapi/budget/fetch/all', { token })
      .then(response => {
          this.setState({ budgetData: response.data });
          this.editBudgetData = response.data;
      });
  }

  componentDidMount() { 
    this.getBudget();
  }

  render() {
    return (
      <main className="center" id="main">
            <h1>Total Budget: ${this.state.budgetData.total}</h1>
            <div id="categories-list">
              {this.editBudgetData.categories?.map(category => (
                <div key={category.name} className="category-item">
                  <div className="row">
                    <label htmlFor="name">{category.name}</label>
                    <input type="text" name="name" defaultValue={category.name} onChange={(e) => this.changeName(e.target.value, category)} id="email" />
                  </div>
                  <div className="row">
                    <label htmlFor="price">{category.price}</label>
                    <input type="number" name="price" defaultValue={category.price} onChange={(e) => this.changePrice(e.target.value, category)} id="email" />
                  </div>
                  <div className="row">
                    <button onClick={() => this.editCategory(category.name)}>Save</button>
                    <button onClick={() => this.deleteCategory(category.name)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => this.configure()}>Submit Configuration</button>
      </main>
    );
  }
  
}

export default ConfigurePage;
