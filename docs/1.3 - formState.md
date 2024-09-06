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
 
// isDirty: false porque getValues() === defaultValues
setValue('test', '')
```

* A entrada de arquivo digitada precisará ser gerenciada no nível do aplicativo devido à capacidade de cancelar a seleção de arquivos e ao objeto FileList.
* Não é suportado objeto customizado, Classe ou objeto File.

nome: `dirtyFields`

tipo: `object`

descrição:
    Um objeto com os campos modificados pelo usuário. Certifique-se de fornecer todos os defaultValues dos inputs via useForm, para que a biblioteca possa comparar com os defaultValues.
    * **Importante:** Certifique-se de fornecer defaultValues no useForm, para que o hook form tenha uma única fonte de verdade para comparar a "dirtiness" de cada campo.
    * Campos sujos não representam o estado formState.isDirty, porque campos sujos são marcados como sujos no nível do campo, em vez de no formulário inteiro. Se você quiser determinar o estado do formulário inteiro, use isDirty.

nome: `touchedFields`

tipo: `object`

descrição:
    Um objeto contendo todos os inputs com os quais o usuário interagiu.

nome: `defaultValues`

tipo: `object`

descrição:
    O valor que foi definido em defaultValues do useForm ou valores default atualizados via API de reset.

nome: `isSubmitted`

tipo: `boolean`

descrição:
    Define como verdadeiro após o envio do formulário. Permanecerá verdadeiro até que o método reset seja invocado.

nome: `isSubmitSuccessful`

tipo: `boolean`

descrição:
    Indica que o formulário foi enviado com sucesso sem erros de execução.

nome: `isSubmitting`

tipo: `boolean`

descrição:
    Verdadeiro se o formulário estiver sendo enviado no momento. Falso caso contrário.

nome: `isLoading`

tipo: `boolean`

descrição:
    Verdadeiro se o formulário estiver carregando valores default assíncronos.
    **Importante:** esta propriedade só é aplicável a valores default assíncronos.
    ```typescript
    const { 
        formState: { isLoading } 
        } = useForm({ 
        defaultValues: async () => await fetch('/api') 
    });
    ```

nome: `submitCount`

tipo: `number`

descrição:
    Número de vezes que o formulário foi enviado.

nome: `isValid`

tipo: `boolean`

descrição:
    Define como verdadeiro se o formulário não tiver erros. 
    setError não tem efeito sobre o formState.isValid; isValid sempre será derivado pelo resultado da validação do formulário inteiro.

nome: `isValidating`

tipo: `boolean`

descrição:
    Define como verdadeiro durante a validação.

nome: `validatingFields`

tipo: `boolean`

descrição:
    Captura campos que estão passando por validação assíncrona.

nome: `errors`

tipo: `object`

descrição:
    Um objeto com erros de campo. Também há um componente ErrorMessage para recuperar mensagens de erro facilmente.

### REGRAS

* formState é envolvido com um Proxy para melhorar o desempenho de renderização e pular a lógica extra se um estado específico não for inscrito. Portanto, certifique-se de invocá-lo ou lê-lo antes de uma renderização para permitir a atualização do estado.

* formState é atualizado em lote. Se você quiser se inscrever em formState via useEffect, certifique-se de colocar o formState inteiro no array opcional.

```typescript
useEffect(() => {
  if (formState.errors.firstName) {
    // faça sua lógica aqui
  }
}, [formState]); // ✅ 
// ❌ formState.errors não acionará o useEffect
```

* Preste atenção ao operador lógico ao se inscrever em formState.

```typescript
// ❌ formState.isValid é acessado condicionalmente, 
// então o Proxy não se inscreve em mudanças desse estado
return <button disabled={!formState.isDirty || !formState.isValid} />;
  
// ✅ leia todos os valores de formState para se inscrever em mudanças
const { isDirty, isValid } = formState;
return <button disabled={!isDirty || !isValid} />;
```

#### Exemplos

```typescript
import { useForm } from "react-hook-form";


type FormInputs = {
  test: string
}


export default function App() {
  const {
    register,
    handleSubmit,
    // Leia o formState antes da renderização para se inscrever no estado do formulário através do Proxy
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