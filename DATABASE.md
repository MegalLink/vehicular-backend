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
    
    Brand "1" -- "0..*" BrandModel : has
    BrandModel "1" -- "0..*" BrandModelType : has
```

Las únicas tablas relacionadas son:
- **Brand** → **BrandModel** → **BrandModelType**

El resto de las tablas (Category, Order, SparePart, UserDetail, User, Notification, File) no tienen relaciones directas entre entidades.
