# unregister
## Desregistrar entradas não controladas/controladas

### </> unregister: (name: string | string[], options) => void

Este método permite desregistrar uma única entrada ou um array de entradas. Ele também fornece um segundo argumento opcional para manter o estado após desregistrar uma entrada.

#### Props

O exemplo abaixo mostra o que esperar ao invocar o método unregister.

```typescript
<input {...register('yourDetails.firstName')} />
<input {...register('yourDetails.lastName')} />
```
Tipo	                        Nome da Entrada	                                                Valor
string	                        unregister("yourDetails")	                                {}
string	                        unregister("yourDetails.firstName")	                        { lastName: '' }
string[]	                    unregister(["yourDetails.lastName"])	                    ''

#### Options
Nome	                        Tipo	                        Descrição
keepDirty	                    boolean	                        isDirty e dirtyFields serão mantidos durante esta ação. No entanto, isso não garantirá que a próxima entrada do usuário não atualizará o isDirty do formState, pois o isDirty é medido em relação aos defaultValues.
keepTouched	                    boolean	                        touchedFields não removerá mais essa entrada após o unregister.
keepIsValid	                    boolean	                        isValid será mantido durante esta ação. No entanto, isso não garantirá que a próxima entrada do usuário não atualizará o isValid para a validação do esquema, você terá que ajustar o esquema de acordo com o unregister.
keepError	                    boolean	                        erros não serão atualizados.
keepValue	                    boolean	                        o valor atual da entrada não será atualizado.
keepDefaultValue                boolean                         o valor defaultValue da entrada definido em useForm será mantido.

### REGRAS
* Este método removerá a referência da entrada e seu valor, o que significa que as regras de validação internas também serão removidas.
* Ao desregistrar uma entrada, isso não afetará a validação do esquema.
```typescript
const schema = yup
  .object()
  .shape({
    firstName: yup.string().required(),
  })
  .required()

unregister("firstName") // isso não removerá a validação contra a entrada firstName
```
* Certifique-se de desmontar a entrada que tem o callback de registro ou a entrada será registrada novamente.
```typescript
const [show, setShow] = React.useState(true)

const onClick = () => {
  unregister("test")
  setShow(false) // certifique-se de desmontar essa entrada para que o registro não seja invocado novamente.
}

{
  show && <input {...register("test")} />
}
```

#### Exemplos:

```typescript
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"


interface IFormInputs {
  firstName: string
  lastName?: string
}


export default function App() {
  const { register, handleSubmit, unregister } = useForm<IFormInputs>()
  const onSubmit = (data: IFormInputs) => console.log(data)


  React.useEffect(() => {
    register("lastName")
  }, [register])


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type="button" onClick={() => unregister("lastName")}>
        unregister
      </button>
      <input type="submit" />
    </form>
  )
}
```