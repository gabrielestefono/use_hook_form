# register
## Registra inputs controlados/ não controlados

### </> register: (name: string, RegisterOptions?) => ({ onChange, onBlur, name, ref })

Esse método te permite registrar um input ou selecionar um elemento e aplicar regras de validação ao React Hook Form. Regras de validação são baseadas no html padrão e também permitem o uso de métodos de validação customizados.

Ao invocar a função register e dando a ele o nome do input, você recebe os seguintes métodos.

### Props

Nome            Typo                Descrição
onChange        ChangeHandler       Propriedade onChange para subscrever o evento de mudança do input.
onBlur	        ChangeHandler	      Prop onBlur para assinar o evento de perda de foco do input.
name	          string              Nome do input sendo registrado.

Nome do Input	                        Resultado do Envio
register("firstName")	                {firstName: 'value'}
register("name.firstName")	            {name: { firstName: 'value' }}
register("name.firstName.0")	        {name: { firstName: [ 'value' ] }}

## Return

**Tip**: What's happened to the input after invoke register API:

```typescript
const { onChange, onBlur, name, ref } = register('firstName'); 
// include type check against field path with the name you have supplied.
        
<input 
  onChange={onChange} // assign onChange event 
  onBlur={onBlur} // assign onBlur event
  name={name} // assign name prop
  ref={ref} // assign ref prop
/>
// same as above
<input {...register('firstName')} />
```
## Opções

Ao selecionar a opção de registro, a tabela da API abaixo será atualizada.

### ref: React.Ref
Referência do elemento React

```tsx
<input {...register("test")} />
```

### required: boolean
Um valor booleano que, se verdadeiro, indica que o campo deve ter um valor antes que o formulário possa ser enviado. Você pode atribuir uma string para retornar uma mensagem de erro no objeto de erros.

Nota: Esta configuração está alinhada com a API web para validação de campos obrigatórios. Para tipos de entrada objeto ou array, use a função `validate` em vez disso.

```tsx
<input
  {...register("test", {
    required: true
  })}
/>
```

### maxLength: number

O comprimento máximo do valor a ser aceito para este campo.	

```tsx
<input
  {...register("test", {
      maxLength: 2
  })}
/>
```
### minLength: number

O comprimento mínimo do valor a ser aceito para este campo.	
```tsx
<input
  {...register("test", {
    minLength: 1
  })}
/>
```
### max: number

O valor máximo a ser aceito para este campo.

```tsx
<input
  type="number"
  {...register('test', {
    max: 3
  })}
/>
```

### min: number

O valor mínimo a ser aceito para este campo.	

```tsx
<input
  type="number"
  {...register("test", {
    min: 3
  })}
/>
```

### pattern: RegExp

O padrão regex para o campo.

**Nota:** Um objeto RegExp com a flag /g mantém o controle do lastIndex onde uma correspondência ocorreu.

```tsx
<input
  {...register("test", {
    pattern: /[A-Za-z]{3}/
  })}
/>
```

### validate: Function | Object

Você pode passar uma função de callback como argumento para `validate`, ou pode passar um objeto de funções de callback para validar todas elas. Esta função será executada sozinha, sem depender de outras regras de validação incluídas no atributo `required`.

**Nota:** para dados de entrada tipo objeto ou array, é recomendável usar a função `validate` para validação, já que as outras regras se aplicam principalmente a tipos de dados string, string[], number e boolean.

```tsx
<input {...register("test", {validate: (value, formValues) => value === '1'})}/>
```
```tsx
<input
  {...register("test1", {
    validate: {
      positive: v => parseInt(v) > 0,
      lessThanTen: v => parseInt(v) < 10,
      validateNumber: (_, values) =>
        !!(values.number1 + values.number2), 
      checkUrl: async () => await fetch(),
    }
  })}
/>
```

### valueAsNumber: boolean

Retorna um número normalmente. Se algo der errado, será retornado NaN.
* O processo `valueAs` ocorre antes da validação.
* Aplicável e suportado apenas para `<input type="number" />`, mas ainda assim fazemos a conversão para o tipo número sem trim ou qualquer outra manipulação de dados.
* Não transforma `defaultValue` ou `defaultValues`.

```tsx
<input
  type="number"
  {...register("test", {
    valueAsNumber: true,
  })}
/>
```

### valueAsDate: boolean

Retorna um objeto `Date` normalmente. Se algo der errado, será retornado um `Invalid Date`.
* O processo `valueAs` ocorre antes da validação.
* Aplica-se apenas a `<input />`.
* Não transforma `defaultValue` ou `defaultValues`.

```tsx
<input
  type="date"
  {...register("test", {
    valueAsDate: true,
  })}
/>
```

### setValueAs: <T>(value: any) => T

Retorna o valor do campo de entrada passando pela função.
* O processo `valueAs` ocorre antes da validação. Além disso, `setValueAs` é ignorado se `valueAsNumber` ou `valueAsDate` forem verdadeiros.
* Aplica-se apenas a campos de texto.
* Não transforma `defaultValue` ou `defaultValues`.

```tsx
<input
  type="number"
  {...register("test", {
    setValueAs: v => parseInt(v),
  })}
/>
```

### disabled: boolean = false

Definir `disabled` como verdadeiro fará com que o valor do campo de entrada seja `undefined` e o controle de entrada seja desativado.
* A propriedade `disabled` também omitirá as regras de validação integradas.
* Para validação de esquema, você pode aproveitar o valor `undefined` retornado do campo de entrada ou do objeto de contexto.

```tsx
<input
  {...register("test", {
    disabled: true
  })}
/>
```

### onChange: (e: SyntheticEvent) => void	

Função `onChange` a ser invocada no evento de mudança.

```tsx
register('firstName', {
  onChange: (e) => console.log(e)
})
```

### onBlur: (e: SyntheticEvent) => void
	
Função `onBlur` a ser invocada no evento de perda de foco.

```tsx
register('firstName', {
  onBlur: (e) => console.log(e)
})
```

### value: unknown

Define o valor para o campo de entrada registrado. Esta propriedade deve ser utilizada dentro de `useEffect` ou invocada uma vez. Cada nova execução atualizará ou sobrescreverá o valor do campo de entrada que você forneceu.

```tsx
register('firstName', { value: 'bill' })
```

### shouldUnregister: boolean

O campo será desregistrado após o desmontagem e os `defaultValues` também serão removidos.

**Nota:** esta propriedade deve ser evitada ao usar com `useFieldArray`, pois a função `unregister` é chamada após o desmontagem/remontagem e reordenação do campo de entrada.

```tsx
<input
  {...register("test", {
    shouldUnregister: true,
  })}
/>
```

### deps: string | string[]

A validação será acionada para os campos de entrada dependentes; isso é limitado à API de registro, não ao acionamento.

```tsx
<input
  {...register("test", {
    deps: ['inputA', 'inputB'],
  })}
/>
```

Claro, aqui está a tradução para o português:

## Regras

* O nome é obrigatório e deve ser único (exceto para rádio nativo e checkbox). O nome do input suporta tanto a sintaxe de ponto quanto a de colchetes, o que permite criar facilmente campos de formulário aninhados.
* O nome não pode começar com um número nem usar números como chave. Por favor, evite também caracteres especiais.
* Estamos usando apenas a sintaxe de ponto para consistência com TypeScript, portanto, colchetes [] não funcionarão para valores de formulário em array.

```typescript
register('test.0.firstName'); // ✅
register('test[0]firstName'); // ❌
```

* Inputs desativados resultarão em um valor de formulário indefinido. Se você quiser evitar que os usuários atualizem o input, pode usar readOnly ou desativar o <fieldset /> inteiro. Aqui está um exemplo.
* Para produzir um array de campos, os nomes dos inputs devem ser seguidos por um ponto e um número. Por exemplo: test.0.data
* Mudar o nome em cada renderização resultará em novos inputs sendo registrados. É recomendável manter nomes estáticos para cada input registrado.
* O valor e a referência do input não serão mais removidos com base na desmontagem. Você pode invocar unregister para remover esse valor e referência.
* A opção de registro individual não pode ser removida usando undefined ou {}. Em vez disso, você pode atualizar o atributo individualmente.

```typescript
register('test', { required: true });
register('test', {}); // ❌
register('test', undefined); // ❌
register('test', { required: false });  // ✅
```

* Existem certas palavras-chave que devem ser evitadas para não conflitar com a verificação de tipo. Elas são ref, _f

## Exemplos

```typescript
import * as React from "react";
import { useForm } from "react-hook-form";


export default function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder="Nome" />


      <input {...register("lastName")} placeholder="Sobrenome" />


      <select {...register("category")}>
        <option value="">Selecione...</option>
        <option value="A">Categoria A</option>
        <option value="B">Categoria B</option>
      </select>


      <input type="submit" />
    </form>
  );
}
```

### Dicas

#### Registro Personalizado

Você também pode registrar inputs com useEffect e tratá-los como inputs virtuais. Para componentes controlados, fornecemos um hook personalizado useController e o componente Controller para cuidar desse processo para você.

Se você optar por registrar os campos manualmente, precisará atualizar o valor do input com setValue.

```typescript
register('firstName', { required: true, min: 8 });


<TextInput onTextChange={(value) => setValue('lastChange', value))} />
```

#### Como trabalhar com innerRef, inputRef?

Quando o componente de input personalizado não expõe o ref corretamente, você pode fazê-lo funcionar da seguinte maneira.

```typescript
// não funciona, porque ref não está atribuído
<TextInput {...register('test')} />


const firstName = register('firstName', { required: true })
<TextInput
  name={firstName.name}
  onChange={firstName.onChange}
  onBlur={firstName.onBlur}
  inputRef={firstName.ref} // você pode alcançar o mesmo para um nome de ref diferente, como innerRef
/>


// maneira correta de encaminhar o ref do input
const Select = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
  <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
    <option value="20">20</option>
    <option value="30">30</option>
  </select>
));
```