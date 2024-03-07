# `React-Router-Project` [ ENG ]

This project is a project that I started to create in order to use all my experience I have learned so far, to add new ones to my knowledge and to bring myself to a higher level in my field.

## `Tech-Stack`

-   React-Router
-   Tanstack-Query
-   MaterialUI
-   React-Hook-Form
-   React-Spring
-   Styled-Components
-   TypeScript
-   Firebase
-   React-Hot-Toast
-   Uuid
-   Context-API
-   LocalStorage

## `Login [ Authentication & Authorization ]`

-   I used styled-components and materialUI to create the login page interface. I used the rich content of the react-hook-form library to handle the correctness of the form information and to display error messages to the user in case of errors.
-   Using the **signInWithEmailAndPassword** function provided by Firebase for _Authentication and Authorization_, I took the user's information from the login page and login form I created and allowed the user to access the application according to the authenticated or not verified status.

## `Registration`

-   For users who do not yet have an account, I created a registration form, and if they provided the required information, I directed the user to the login page to enter their newly created account information and access the application. I sent a verification email to the user's email for the new account created.

## `DarkMode & LightMode`

-   Users are free to use whatever theme they want. To handle Darkmode & LightMode, I created a DarkModeContext and set it to automatically adapt the user's device theme to the app.

## `Updating user`

-   I created the settings page and settings form in the application so that the user can update the name and avatar to be displayed. As with login and register, I got support from interface libraries. Again, while updating my database with the **uploadBytes** function provided by firebase, I used the **getDownloadURL** function to show the user's previously selected avatar in my header.

# `React-Router-Project` [ TR ]

Bu projem şu ana kadar öğrendiğim tüm tecrübelerimi kullanmak, bilgilerime yenilerini eklemek ve alanımda kendimi daha yüksek bir seviyeye getirmek amacıyla oluşturmaya başladığım bir projedir.

## `Tech-Stack`

-   React-Router
-   Tanstack-Query
-   MaterialUI
-   React-Hook-Form
-   React-Spring
-   Styled-Components
-   TypeScript
-   Firebase
-   React-Hot-Toast
-   Uuid
-   Context-API
-   LocalStorage

## `Login [ Authentication & Authorization ]`

-   Login sayfası arayüzü oluşturulması için styled-components ve materialUI'dan faydalandım. Form bilgilerinin doğruluğunu ele almak ve kullanıcıya yapabileceği hatalar doğrultusunda gösterilecek hata mesajları için react-hook-form kütüphanesinin zengin içeriğini kullandım.
-   Authentication ve Authorization için Firebase'in sağlamış olduğu **signInWithEmailAndPassword** fonksiyonunu kullanarak oluşturduğum login sayfası ve login form'undan kullanıcının bilgilerini ele alarak kullanıcının authenticated veya not verified kondisyonuna göre uygulamaya erişimine izin verilir.

## `Register`

-   Henüz bir hesabı olmayan ve kullanıcılar için bir register formu mevcut olup gerekli bilgileri sağladıkları taktirde kullanıcı login sayfasına yeni oluşturduğu hesap bilgilerini girmek ve uygulamaya erişim sağlamak adına yönlendirilir. Oluşturulan yeni hesap için kullanıcının e-mail'ine bir doğrulama maili gönderilir ve kullanıcıdan mail onayı beklenir.

## `DarkMode & LightMode`

-   Kullanıcılar diledikleri temayı kullanmakta özgürdürler. Darkmode & LightMode durumunu ele almak için bir DarkModeContext oluşturdum. Bu context kullanıcının cihaz temasını otomatik olarak uygulamaya uyarlayacak biçimde ayarlandı.

## `Updating user`

-   Kullanıcının gösterilecek ismi ve avatar'ını güncelleyebilmesi için uygulama içerisinde settings sayfası ve settings formunu oluşturdum. Login ve register'da olduğu gibi arayüz kütüphanelerinden destek aldım. Yine firebase'in sağlamış olduğu **uploadBytes** fonksiyonu ile database'imi güncellerken **getDownloadURL** fonksiyonu ile de kullanıcının daha önceden seçtiği avatar'ını header kısmımda göstermek için kullandım.
