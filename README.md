# `React-Router-Project` [ ENG 🔵 ]

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
-   Moment

<p align="left"> 
<img src="https://techstack-generator.vercel.app/react-icon.svg" alt="icon" width="45" height="45" />
<img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="45" height="45" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="40" height="40" />         
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40" height="40" /> 
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" width="40" height="40" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" width="40" height="40" />
<img src="https://techstack-generator.vercel.app/ts-icon.svg" alt="icon" width="45" height="45" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original-wordmark.svg" width="40" height="40" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactrouter/reactrouter-original-wordmark.svg"  width="45" height="45" />
<img src="./public/readme-react-spring.png"  width="45" height="45" />
 </p>

## `Login [ Authentication & Authorization ]`

-   I used styled-components and materialUI to create the login page interface. I used the rich content of the react-hook-form library to handle the correctness of the form information and to display error messages to the user in case of errors.
-   Using the **signInWithEmailAndPassword** function provided by Firebase for _Authentication and Authorization_, I took the user's information from the login page and login form I created and allowed the user to access the application according to the authenticated or not verified status.

## `Registration`

-   For users who do not yet have an account, I created a registration form, and if they provided the required information, I directed the user to the login page to enter their newly created account information and access the application. I sent a verification email to the user's email for the new account created.

## `DarkMode & LightMode`

-   Users are free to use whatever theme they want. To handle Darkmode & LightMode, I created a DarkModeContext and set it to automatically adapt the user's device theme to the app.

## `Updating User Name & Avatar`

-   I created the settings page and settings form in the application so that the user can update the name and avatar to be displayed. As with login and register, I got support from interface libraries. Again, while updating my database with the **uploadBytes** function provided by firebase, I used the **getDownloadURL** function to show the user's previously selected avatar in my header.

## `Updating Email & Password `

-   In order to update the user's password and email information, I created **modal windows** that handle both situations.
-   In the email update modal, I designed a field that shows the user their current email, a field where they can enter their new email, and a field where they can enter their account password to update their email.
-   When the user entered all the information correctly, I sent a **verify email** to the email address they wanted to change. To handle this situation, I used the **verifyBeforeUpdateEmail** function provided by Firebase. I then handled this function using the useMutation function via Tanstack-Query. In this way, I was able to show the user the status information in a more accurate and detailed way.
-   In the password update modal, I designed a field where the user can enter their current password, a field where they can enter their new password, and a field where they can enter a repeat of their new password.
-   I prevented the user from creating a new password if he/she does not enter his/her current password correctly. I used tanstack-query in my password update just like my email update.
-   In both status updates, I used the **reauthenticateWithCredential** function provided by firebase where I can use the existing password to update the user's re-authenticate status before updating the information.

## `Deleting User`

-   I have created a modal interface for the user to delete their existing account and I have provided a warning to the user explaining what happens if their account is deleted.
-   The user can delete their account by entering their **current password** and after deleting the account the user is automatically **logout** and redirected to the login page.

# `React-Router-Project` [ TR 🔴 ]

Bu projem şu ana kadar öğrendiğim tüm tecrübelerimi kullanmak, bilgilerime yenilerini eklemek ve alanımda kendimi daha yüksek bir seviyeye getirmek amacıyla oluşturmaya başladığım bir projedir.

## `Teknoloji Yığını`

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

## `Giriş [ Kimlik Doğrulama & Yetkilendirme ]`

-   Login sayfası arayüzü oluşturulması için styled-components ve materialUI'dan faydalandım. Form bilgilerinin doğruluğunu ele almak ve kullanıcıya yapabileceği hatalar doğrultusunda gösterilecek hata mesajları için react-hook-form kütüphanesinin zengin içeriğini kullandım.
-   Authentication ve Authorization için Firebase'in sağlamış olduğu **signInWithEmailAndPassword** fonksiyonunu kullanarak oluşturduğum login sayfası ve login form'undan kullanıcının bilgilerini ele alarak kullanıcının authenticated veya not verified kondisyonuna göre uygulamaya erişimine izin verilir.

## `Kayıt`

-   Henüz bir hesabı olmayan ve kullanıcılar için bir register formu mevcut olup gerekli bilgileri sağladıkları taktirde kullanıcı login sayfasına yeni oluşturduğu hesap bilgilerini girmek ve uygulamaya erişim sağlamak adına yönlendirilir. Oluşturulan yeni hesap için kullanıcının e-mail'ine bir doğrulama maili gönderilir ve kullanıcıdan mail onayı beklenir.

## `Karanlık Mod & Açık Mod`

-   Kullanıcılar diledikleri temayı kullanmakta özgürdürler. Darkmode & LightMode durumunu ele almak için bir DarkModeContext oluşturdum. Bu context kullanıcının cihaz temasını otomatik olarak uygulamaya uyarlayacak biçimde ayarlandı.

## `Kullanıcı İsmi & Avatar Güncelleme`

-   Kullanıcının gösterilecek ismi ve avatar'ını güncelleyebilmesi için uygulama içerisinde settings sayfası ve settings formunu oluşturdum. Login ve register'da olduğu gibi arayüz kütüphanelerinden destek aldım. Yine firebase'in sağlamış olduğu **uploadBytes** fonksiyonu ile database'imi güncellerken **getDownloadURL** fonksiyonu ile de kullanıcının daha önceden seçtiği avatar'ını header kısmımda göstermek için kullandım.

## `Email & Şifre Güncelleme`

-   Kullanıcının şifre ve email bilgisini güncelleyebilmek için iki durumu da ele alan **modal pencereleri** oluşturdum.
-   Email güncelleme modalında kullanıcıya mevcut email'ini gösteren bir alan, yeni email bilgisini girebileceği bir alan, ve email bilgisini güncelleyebilmesi için hesap şifresini gireceği bir alan tasarladım.
-   Kullanıcı tüm bilgilerini doğru bir şekilde girdiğinde değiştirmek istediği email adresine bir **doğrulama maili** gönderdim. Bu durumu ele almak için Firebase'in sağladığı **verifyBeforeUpdateEmail** fonksiyonundan faydalandım. Daha sonra bu fonksiyonumu Tanstack-Query aracılığıyla useMutation fonksiyonu kullanarak ele aldım. Böylece kullanıcıya gerçekleşen durum bilgilerini daha doğru ve detaylı şekilde gösterebildim.
-   Şifre güncelleme modalında kullanıcıya mevcut şifresini girebileceği bir alan, yeni şifresini ve yeni şifresinin tekrarını girebileceği bir alan tasarladım.
-   Kullanıcının mevcut şifresini doğru girmediği taktirde yeni bir şifre oluşturmasını engelledim. Aynı email güncellememde olduğu gibi şifre güncellememde de tanstack-query'den faydalandım.
-   Her iki durum güncellemesinde de kullanıcının bilgi güncellemesi yapmadan önce yeniden authenticate olması durumunu güncellemek için mevcut şifresini kullanabileceğim firebase'in sunduğu **reauthenticateWithCredential** fonksiyonundan faydalandım.

## `Kullanıcı Silme`

-   Kullanıcının mevcut hesabını silebilmesi için bir modal arayüzü oluşturdum ve kullanıcıya hesabının silinmesi durumunda gerçekleşecek durumları açıklayan bir uyarıda bulundum.
-   Kullanıcı **mevcut şifresini** girerek hesabını silebilir ve hesap silindikten sonra kullanıcı otomatik olarak **logout** edilir ve login sayfasına yönlendirilir.
