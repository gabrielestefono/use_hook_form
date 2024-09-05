# formState
## Estado do formulário

### </> formState: Object

Esse objeto contém informação sobre todo o estado do formulário. Isso ajuda você a se mante no caminho com a interação do usuário com o seu formulário da aplicação.

#### Retorno

nome: `isDirty`
tipo: `boolean`
descrição:
    seta para verdadeiro após o usuário modificar qualquer um dos inputs.
    * **IMPORTANTE:** Tenha certeza de definir todos os valores default para o formulário no useForm, então o hook form pode ter uma base única para comparar porque o formulário está dirty. 
```typescript
const {
  formState: { isDirty, dirtyFields },
  setValue,
} = useForm({ defaultValues: { test: "" } });


// isDirty: true
setValue('test', 'change')
 
// isDirty: false because there getValues() === defaultValues
setValue('test', '')
```

* File typed input will need to be managed at the app level due to the ability to cancel file selection and FileList object.
* Do not support custom object, Class or File object.

name: `dirtyFields`

type: `object`

description:
    An object with the user-modified fields. Make sure to provide all inputs' defaultValues via useForm, so the library can compare against the defaultValues.
    * **Important:** Make sure to provide defaultValues at the useForm, so hook form can have a single source of truth to compare each field's dirtiness.
    * Dirty fields will not represent as isDirty formState, because dirty fields are marked field dirty at field level rather the entire form. If you want to determine the entire form state use isDirty instead.
name: `touchedFields`	    

type: `object`	

description: 
    An object containing all the inputs the user has interacted with.
name: `defaultValues`	    

type: `object`	

description: 
    The value which has been set at useForm's defaultValues or updated defaultValues via reset API.
name: `isSubmitted`	        

type: `boolean`	

description: 
    Set to true after the form is submitted. Will remain true until the reset method is invoked.
name: `isSubmitSuccessful`  

type: `boolean`	

description: 
    Indicate the form was successfully submitted without any runtime error.
name: `isSubmitting`	    

type: `boolean`	

description: 
    true if the form is currently being submitted. false otherwise.
name: `isLoading`           

type: `boolean`	

description: 
    true if the form is currently loading async default values.
    **Important:** this prop is only applicable to async defaultValues
    ```typescript
    const { 
        formState: { isLoading } 
        } = useForm({ 
        defaultValues: async () => await fetch('/api') 
    });
    ```
name: `submitCount`	

type: `number`	

description: 
    Number of times the form was submitted.
name: `isValid`	

type: `boolean`	

description: 
    Set to true if the form doesn't have any errors. 
    setError has no effect on isValid formState, isValid will always derived via the entire form validation result.
name: `isValidating`	

type: `boolean`	

description: 
    Set to true during validation.
name: `validatingFields`	

type: `boolean`	

description: 
    Capture fields which are getting async validation.
name: `errors`	

type: `object`	

description: 
    An object with field errors. There is also an ErrorMessage component to retrieve error message easily.

### RULES

* formState is wrapped with a Proxy to improve render performance and skip extra logic if specific state is not subscribed to. Therefore make sure you invoke or read it before a render in order to enable the state update.

* formState is updated in batch. If you want to subscribe to formState via useEffect, make sure that you place the entire formState in the optional array.

```typescript
useEffect(() => {
  if (formState.errors.firstName) {
    // do the your logic here
  }
}, [formState]); // ✅ 
// ❌ formState.errors will not trigger the useEffect
```

* Pay attention to the logical operator when subscription to formState.

```typescript
// ❌ formState.isValid is accessed conditionally, 
// so the Proxy does not subscribe to changes of that state
return <button disabled={!formState.isDirty || !formState.isValid} />;
  
// ✅ read all formState values to subscribe to changes
const { isDirty, isValid } = formState;
return <button disabled={!isDirty || !isValid} />;
```

#### Examples

```typescript
import { useForm } from "react-hook-form";


type FormInputs = {
  test: string
}


export default function App() {
  const {
    register,
    handleSubmit,
    // Read the formState before render to subscribe the form state through Proxy
    formState: { errors, isDirty, isSubmitting, touchedFields, submitCount },
  } = useForm<FormInputs>();
  const onSubmit = (data: FormInputs) => console.log(data);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("test")} />
      <input type="submit" />
    </form>
  );
}
```