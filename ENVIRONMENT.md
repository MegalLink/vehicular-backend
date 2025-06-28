# Configuración de Variables de Entorno

## Variables de Entorno del Proyecto

| NOMBRE VARIABLE | LOCAL ENVIRONMENT | ONLINE ENVIRONMENT | DESCRIPCIÓN |
|----------------|-------------------|-------------------|-------------|
| **Configuración General** | | | |
| `NODE_ENV` | `development` | `production` | Entorno de ejecución |
| `PORT` | `3000` | Configuración del servidor | Puerto de la aplicación |
| `MONGODB` | `mongodb://localhost:27017/vehicular` | Variable de entorno del servicio de base de datos | URL de MongoDB |
| `ALLOWED_DOMAINS` | `http://localhost:3000,http://localhost:4200` | Variables de entorno del despliegue | Dominios permitidos para CORS |
| `REST_API_URL` | `http://localhost:3000` | Variable de entorno del despliegue | URL base de la API |
| **Autenticación JWT** | | | |
| `JWT_SECRET` | `supersecretkey123!@#` | Secrets Manager | Clave para firmar tokens JWT |
| `JWT_EXPIRES_IN` | `24h` | Variable de entorno | Tiempo de expiración de tokens |
| **Cloudinary** | | | |
| `CLOUDINARY_CLOUD_NAME` | `mi-cloud` | Secrets Manager | Nombre de cuenta Cloudinary |
| `CLOUDINARY_API_KEY` | `123456789012345` | Secrets Manager | API Key de Cloudinary |
| `CLOUDINARY_API_SECRET` | `aBcDeFgHiJkLmNoPqRsTuVwXyZ` | Secrets Manager | API Secret de Cloudinary |
| **Correo Electrónico** | | | |
| `EMAIL_HOST` | `smtp.gmail.com` | Secrets Manager | Servidor SMTP |
| `EMAIL_PORT` | `587` | Variable de entorno | Puerto SMTP |
| `EMAIL_USER` | `tucuenta@gmail.com` | Secrets Manager | Usuario SMTP |
| `EMAIL_PASS` | `tupassword123` | Secrets Manager | Contraseña SMTP |
| `EMAIL_FROM` | `no-reply@vehicular.com` | Variable de entorno | Email remitente |
| **Autenticación con Google** | | | |
| `GOOGLE_CLIENT_ID` | `1234567890-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com` | Secrets Manager | Client ID de Google OAuth |
| `GOOGLE_CLIENT_SECRET` | `GOCSPX-abcdefghijklmnopqrstuvwxyz1234` | Secrets Manager | Client Secret de Google OAuth |
| `GOOGLE_REDIRECT_URL` | `http://localhost:3000/api/v1/auth/google/redirect` | Variable de entorno | URL de redirección de Google |
| **Pagos con Stripe** | | | |
| `STRIPE_SECRET_KEY` | `sk_test_51N...` | Secrets Manager | Clave secreta de Stripe |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Secrets Manager | Secreto para webhooks de Stripe |

## Configuración Inicial

1. Copia el archivo `.env.template` a `.env`
2. Completa los valores según tu entorno de desarrollo
3. Para producción, configura estas variables en tu proveedor de hosting (ej: Vercel, Heroku, AWS, etc.)

## Notas Importantes

- **Nunca** subas el archivo `.env` al control de versiones
- Las variables marcadas como "Secrets Manager" deben manejarse con especial cuidado
- Las URLs de éxito y cancelación de Stripe se manejan desde el frontend en el DTO `StripePaymentDto`
- Para producción, se recomienda usar un servicio de gestión de secretos como AWS Secrets Manager o Azure Key Vault
