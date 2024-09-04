# useForm
## Hook React para validação de Formulários

### </> useForm: UseFormProps

useForm é um hook custom para gerencamento de formulários com facilidade. Ele pega um opjeto como um argumento opctional. O exemplo a seguir demonstra todas as propriedades e seus valores default

#### Propriedades Genéricas
* mode                                                      Estratégia de validação **antes** do submit
* reValidateMode                                            Estratégia de validação **depois** do submit
* defaultValues:                                            Valores default do formulário
* valores                                                   Valores reativos para atualizar os valores do formulário
* erros                                                     Erros reativos para atualizar os valores de erros
* resetOptions                                              Opção de resetar o estado do formulário ou atualizar os valores enquanto reseta o formlário
* criteriaMode                                              Mostra todos os erros de validações ou um de cada vez
* shouldFocusError                                          Habilita ou desabilita o gerenciamento de foco.
* delayError	                                            Cria um delay para que o erro não apareça instantaneamente
* shouldUseNativeValidation	                                Usa a validação nativa do browser
* shouldUnregister	                                        Habilita e desabilita os inputs não registrados depois de desmontar.

#### Validação de Schemas

resolver Integra com a biblioteca de validação da sua preferência.
context	Um objeto de contexto para suprir seu schema de validação.

### Props

#### mode: onChange | onBlur | onSubmit | onTouched | all = 'onSubmit'

Essa opção te permite configurar a estratégia de validação antes do usuário dar submit no formulário. A validação ocorre durante o evento de submit, o que é disparado chamando a função handleSubmit.

Nome	                        Tipo	            Descrição
onSubmit	                    string	            Validação é disparada no disparo do evento de Submit, os input's usam onchange para revalidar a si mesmos.
onBlur	                        string	            Validação é disparada no evento de blur.
onChange                        string	            Validação é disparada no evento de mudança de cada input, levando a múltiplas re-renderização. CUIDADO!
onTouched	                    string	            Validação é inicialmente disparada no primeiro blur, depois disso, é disparada no evento de mudança.
                                                    Nota, qando usando controller, tenha certeza de "amarrar" o blur com o render props.
all	                            string	            Validação é disparada em ambos, blur e change.

#### reValidateMode: onChange | onBlur | onSubmit = 'onChange'

Essa opção permite a você configurar a estratégia de validação quando o input com erro é revalidado depois do usuário dar submit no formulário. (Evento de Submit e handleSubmit executados). Por padrão, a revalidação ocorre quando o input mudar (onChange).

### defaultValues: FieldValues | () => Promise<FieldValues>

A propriedade defaultValues popula todo o formulário com valores. Isso é suportado de forma sincrona e assíncrona. Enquanto você pode setar um valor de um input usando defaultValue ou defaultChecked (como detalhado na documentação oficial do react), é recomendado usar default values para todo o formulário.

```typescript
useForm({
  defaultValues: {
    firstName: '',
    lastName: ''
  }
})

// set default value async
useForm({
  defaultValues: async () => fetch('/api-endpoint');
})
```

#### values: FieldValues

O valor prop vai reagir às mudanças e atualizações dos valores do formulário, o que ajud aquando você precisa que os dados sejam atualizados por um estado externo ou servidor de dados. O valor prop vai sobrescrever o valor default, a menos que resetOptions tenha o atributo {keepDefaultValues: true} também para o useForm.

```typescript
// set default value sync
function App({ values }) {
  useForm({
    values, // will get updated when values props updates
  })
}


function App() {
  const values = useFetch("/api")


  useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    values, // will get updated once values returns
  })
}
```

#### errors: FieldErrors

As propriedades de erros irão reagir às mudanças e atualizar o estado dos erros do servidor, o que é útil quando o seu formulário precisa ser atualizado com erros retornados pelo servidor externo.

```typescript

function App() {
  const { errors, data } = useFetch("/api")


  useForm({
    errors, // will get updated once errors returns
  })
}

```

#### resetOptions: KeepStateOptions

Essa propriedade é relacionado ao comportamento de atualização. Quando valores ou valores Default são atualizados, a api reset é invocada internamente. É importante especificar o comportamento que você quer quando o valor ou valor default é assincronamente atualizado. A configuração option por si mesma é uma referência para o método da opção reset.

```typescript
// by default asynchronously value or defaultValues update will reset the form values
useForm({ values })
useForm({ defaultValues: async () => await fetch() })


// options to config the behaviour
// eg: I want to keep user interacted/dirty value and not remove any user errors
useForm({
  values,
  resetOptions: {
    keepDirtyValues: true, // user-interacted input will be retained
    keepErrors: true, // input errors will be retained with value update
  },
})
```

#### context: object

Este objeto de contexto é mutável e será injetado como o segundo argumento do resolver ou no objeto de contexto da validação do Yup.

#### criteriaMode: firstError | all

* Quando definido como firstError (padrão), apenas o primeiro erro de cada campo será coletado.
* Quando definido como all, todos os erros de cada campo serão coletados.

#### shouldFocusError: boolean = true

Quando definido como `true` (padrão) e o usuário submete um formulário que falha na validação, o foco é definido no primeiro campo com um erro.

**NOTA**  
Apenas campos registrados com um `ref` funcionarão. Inputs registrados de forma personalizada não se aplicam. Por exemplo: `register('test')` // não funciona.  
A ordem de foco é baseada na ordem de registro.

#### delayError: number

Essa configuração atrasa a exibição dos estados de erro para o usuário final por um número especificado de milissegundos. Se o usuário corrigir o erro no campo, o erro é removido instantaneamente, e o atraso não é aplicado.

#### shouldUnregister: boolean = false

Por padrão, o valor de um input será mantido quando o input for removido. No entanto, você pode definir `shouldUnregister` como `true` para desregistrar o input durante o unmount.

* Essa é uma configuração global que sobrescreve configurações em nível de componente filho. Para ter um comportamento individual, defina a configuração no nível do componente ou do hook, e não no `useForm`.
* Por padrão, `shouldUnregister: false` significa que campos desmontados não são validados pela validação embutida.
* Ao definir `shouldUnregister` como `true` no nível do `useForm`, `defaultValues` não serão mesclados com o resultado da submissão.
* Definir `shouldUnregister: true` faz com que seu formulário se comporte de maneira mais próxima aos formulários nativos.
    * Os valores do formulário são armazenados nos próprios inputs.
    * Desmontar um input remove seu valor.
    * Inputs ocultos devem usar o atributo `hidden` para armazenar dados ocultos.
    * Apenas inputs registrados são incluídos como dados de submissão.
    * Inputs desmontados devem ser notificados no `useForm` ou no `useWatch`'s `useEffect` para que o hook do formulário verifique se o input foi desmontado do DOM.

```typescript
const NotWork = () => {
  const [show, setShow] = React.useState(false)
  // ❌ won't get notified, need to invoke unregister
  return show && <input {...register("test")} />
}

const Work = ({ control }) => {
  const { show } = useWatch({ control })
  // ✅ get notified at useEffect
  return show && <input {...register("test1")} />
}

const App = () => {
  const [show, setShow] = React.useState(false)
  const { control } = useForm({ shouldUnregister: true })
  return (
    <div>
      // ✅ get notified at useForm's useEffect
      {show && <input {...register("test2")} />}
      <NotWork />
      <Work control={control} />
    </div>
  )
}
```

#### shouldUnregister: boolean = false

Esta configuração habilitará a validação nativa do navegador. Ela também habilitará os seletores CSS `:valid` e `:invalid`, facilitando a estilização dos inputs. Você ainda pode usar esses seletores mesmo quando a validação do lado do cliente estiver desativada.

Funciona apenas com os modos `onSubmit` e `onChange`, pois a execução de `reportValidity` focará no input com erro.
A mensagem de validação de cada campo registrado deve ser uma string para ser exibida nativamente.
Essa funcionalidade só funciona com a API `register` e `useController/Controller` que estão conectados com referências reais do DOM.


```typescript
import { useForm } from "react-hook-form"


export default function App() {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })
  const onSubmit = async (data) => {
    console.log(data)
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("firstName", {
          required: "Please enter your first name.",
        })} // custom message
      />
      <input type="submit" />
    </form>
  )
}
```

#### resolver: Resolver

Esta função permite que você use qualquer biblioteca de validação externa, como Yup, Zod, Joi, Vest, Ajv e muitas outras. O objetivo é garantir que você possa integrar, de forma contínua, a biblioteca de validação que preferir. Se você não estiver usando uma biblioteca, pode sempre escrever sua própria lógica para validar seus formulários.

```sh
npm install @hookform/resolvers
```

### Props
Nome	            Tipo	                  Descrição
values	          objeto	                Este objeto contém todos os valores do formulário.
context	          objeto	                Este é o objeto de contexto que você pode fornecer na configuração do `useForm`. É um objeto mutável que pode ser alterado a cada re-renderização.
options	          {                       Este é o objeto de opções que contém informações sobre os campos validados, nomes e `criteriaMode` do `useForm`.
                    "criteriaMode": "string",
                    "fields": "object",
                    "names": "string[]"
                  }

**REGRAS**
* A validação por esquema foca na verificação de erros a nível de campo. A verificação de erros no nível dos pais é limitada ao nível direto dos pais, o que é aplicável a componentes como grupos de checkboxes.
* Esta função será armazenada em cache.
* A revalidação de um input ocorrerá apenas um campo por vez durante a interação do usuário. A biblioteca em si avaliará o objeto de erro para acionar um novo render conforme necessário.
* Um resolver não pode ser usado com os validadores integrados (por exemplo: `required`, `min`, etc.)
* Ao construir um resolver personalizado:
  * Certifique-se de retornar um objeto com as propriedades `values` e `errors`. Seus valores padrão devem ser um objeto vazio. Por exemplo: `{}`.
  * As chaves do objeto de erro devem corresponder aos valores de nome dos seus campos.