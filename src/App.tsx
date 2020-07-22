import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch, useHistory, useLocation} from 'react-router-dom'


type FormFood = {food: string}

type FormDrink = {drink: string}

type State = FormFood & FormDrink 

type Action = FormFood | FormDrink 

type MultiPageFromContextType = {form: State, setFormValues: React.Dispatch<Action>, resetForm: () => void }

const MultiPageFrom = React.createContext<MultiPageFromContextType | null>(null)

const MultiPageFormProvider = ({initialValues = {food: '', drink:''}, ...props}) => {
  const [initialState] = React.useState<State>(initialValues)
  const [form, setFormValues] = React.useReducer((state: State, action: Action) =>({...state,...action}), initialState)
  const resetForm = () => setFormValues(initialValues)

  return (
    <MultiPageFrom.Provider
    value = {{form, setFormValues, resetForm}}
    {...props}
    />
  )
}

const useMultiPageForm = () => {
  const context = React.useContext(MultiPageFrom)
  if (!context) throw new Error('useMultiPageForm was used outside the provider')
  
  return context
}

const Main = () => {
  return (
    <>
    <h1>Welcome to this awesome form</h1>
    <Link to='/page-1'>Fill out the form</Link>
    </>
  )
}

const Page1 = () => {
  const {form, setFormValues} = useMultiPageForm()
  const { push } = useHistory()
  return (
    <>
    <h2>
      Page 1
    </h2>
    <form 
      onSubmit={e => {
      e.preventDefault()
      push('/page-2')
    }}>
      <label htmlFor='food'>Favorite Food</label>
      <input
        id="food"
        value={form.food} 
        onChange={e => setFormValues({food:e.target.value})}
      />
    </form>
    <Link to='/'>Go Home</Link> | <Link to='/page-2'>Next</Link>
    </>
  )
}

const Page2 = () => {
  const {form, setFormValues} = useMultiPageForm()
  const { push } = useHistory()
  return (
    <>
    <h2>
      Page 2
    </h2>
    <form
      onSubmit={e => {
      e.preventDefault()
      push('/page-2')
    }}>
      <label htmlFor='drink'>Favorite Drink</label>
      <input
        id="drink"
        value={form.drink} 
        onChange={e => setFormValues({drink:e.target.value})}
      />
    </form>
    <Link to='/page-1'>Go Back</Link> | <Link to='/confirm'>Review</Link>
    </>
  )
}

const submitForm = (form: State) => {
  //simulating an api request
  return new Promise((resolve) => setTimeout(() => resolve(form), 1000))
} 

const Confirm = () => {
  const {form, resetForm} = useMultiPageForm()
  const { push } = useHistory()

  const handleConfirmClick = () => {
    submitForm(form).then(
      () => {
        resetForm()
        push('/success')
      },
      error => {
        push('/error')
      }
    )
  }

  return(
    <> 
      <h2>Confirm</h2> 
      <div>
        <strong>Please confirm your choices</strong>
      </div>
      <div>
        <strong id='food-label'>Favorite Food: </strong>
        <span aria-labelledby='food-label'>{form.food}</span>
      </div>
      <div>
        <strong id='drink-label'>Favorite Drink: </strong>
        <span aria-labelledby='drink-label'>{form.drink}</span>
      </div>
      <Link to='page-2'>Go Back</Link>
      <button onClick={handleConfirmClick}>Confirm</button>
    </>
  )
}

const Success = () => (
  <>
    <h2>Congrats. You did it.</h2>
    <div>
      <Link to='/'>Go Home</Link>
    </div>
  </>
)

const Problem = () => {
  return(
    <>
      <div>Oh no. There was an error</div>
    </>
  )
}


function App() {
  return (
    <MultiPageFormProvider>
      <Router>
        <Switch>
          <Route path='/page-1' component={Page1}/>
          <Route path='/page-2' component={Page2}/>
          <Route path='/confirm' component={Confirm}/>
          <Route path='/success' component={Success}/>
          <Route path='/error' component={Problem}/>
          <Route component={Main}/>
        </Switch>
      </Router>
    </MultiPageFormProvider>
  )
}

export default App;
