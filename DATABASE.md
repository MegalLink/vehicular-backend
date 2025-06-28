# Documentación de la Base de Datos

## Diagrama Entidad-Relación

```mermaid
classDiagram
    class User {
        +ObjectId _id
        +string email
        +string password
        +string userName
        +string[] roles
        +boolean isActive
        +boolean isEmailConfirmed
        +string confirmationToken
        +Date createdAt
        +Date updatedAt
    }
    
    class UserDetail {
        +ObjectId _id
        +string userID
        +string firstName
        +string lastName
        +string identityDocumentNumber
        +string identityDocumentType
        +string address
        +string postalCode
        +string city
        +string province
        +string phone
        +Date createdAt
        +Date updatedAt
    }
    
    class Order {
        +ObjectId _id
        +string orderID
        +string userID
        +object userDetail
        +number totalPrice
        +string paymentStatus
        +string paymentID
        +object[] items
        +Date createdAt
        +Date updatedAt
    }
    
    class Brand {
        +ObjectId _id
        +string name
        +string image
    }
    
    class BrandModel {
        +ObjectId _id
        +string name
        +string brandId
        +string description
    }
    
    class BrandModelType {
        +ObjectId _id
        +string name
        +string modelId
    }
    
    class Category {
        +ObjectId _id
        +string name
        +string title
        +string image
    }
    
    class SparePart {
        +ObjectId _id
        +string code
        +string name
        +string description
        +number price
        +string[] images
        +string category
        +number stock
        +string brand
        +string brandModel
        +string modelType
        +string modelTypeYear
        +Date createdAt
        +Date updatedAt
    }
    
    User "1" -- "0..*" UserDetail : has
    User "1" -- "0..*" Order : places
    Brand "1" -- "0..*" BrandModel : has
    BrandModel "1" -- "0..*" BrandModelType : has
    Category "1" -- "0..*" SparePart : contains
    Brand "1" -- "0..*" SparePart : brands
    BrandModel "1" -- "0..*" SparePart : models
    BrandModelType "1" -- "0..*" SparePart : versions
```

## Descripción de las Relaciones

1. **User - UserDetail** (1:N)
   - Un usuario puede tener múltiples detalles de usuario
   - Clave foránea: `userID` en UserDetail

2. **User - Order** (1:N)
   - Un usuario puede tener múltiples órdenes
   - Clave foránea: `userID` en Order

3. **Brand - BrandModel** (1:N)
   - Una marca puede tener múltiples modelos
   - Clave foránea: `brandId` en BrandModel

4. **BrandModel - BrandModelType** (1:N)
   - Un modelo puede tener múltiples tipos/versiones
   - Clave foránea: `modelId` en BrandModelType

5. **Category - SparePart** (1:N)
   - Una categoría puede contener múltiples repuestos
   - Clave foránea: `category` en SparePart

6. **Brand - SparePart** (1:N)
   - Una marca puede estar asociada a múltiples repuestos
   - Clave foránea: `brand` en SparePart

7. **BrandModel - SparePart** (1:N)
   - Un modelo puede estar asociado a múltiples repuestos
   - Clave foránea: `brandModel` en SparePart

8. **BrandModelType - SparePart** (1:N)
   - Un tipo de modelo puede estar asociado a múltiples repuestos
   - Clave foránea: `modelType` en SparePart

## Índices

### User
- `{ email: 1 }` - Único, para búsquedas por email

### Brand
- `{ name: 1 }` - Único, para búsquedas por nombre

### BrandModel
- `{ name: 1, brandId: 1 }` - Índice compuesto único para nombres únicos por marca

### BrandModelType
- `{ name: 1, modelId: 1, year: 1 }` - Índice compuesto único para tipos únicos por modelo y año

### Category
- `{ name: 1 }` - Único, para búsquedas por nombre

### Order
- `{ orderID: 1 }` - Único, para búsquedas por ID de orden
- `{ userID: 1 }` - Para búsquedas por usuario

### SparePart
- `{ code: 1 }` - Único, para búsquedas por código
- `{ name: "text", description: "text" }` - Índice de texto para búsqueda
- `{ category: 1 }`, `{ brand: 1 }`, `{ brandModel: 1 }` - Para filtros comunes

### UserDetail
- `{ userID: 1 }` - Único, para búsquedas por usuario
