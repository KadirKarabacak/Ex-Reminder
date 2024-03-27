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
-   i18next
-   Recharts
-   Date-fns
-   jsPDF
-   react-csv
-   Framer-motion

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

## `Employees`

-   I created a table that holds all the information of the employees in the route I created using the MaterialUI Table component. I took the list of all employees from the **employees** collection, a collection I created on firebase.
-   In order to add a new employee, I created an add button in the toolbar of my table and through this button I directed the user to the modal page where they can fill in the information required to add a new employee. I allowed the user to fill in the information such as the full name of the new employee, job title, department, salary, date of hire, age and email and place the new employee in the table. To add a new employee, I used the addDoc() function provided by firebase and handled this function with tanstack-query.
-   In order to update each of the added employees and to correct or complete the incorrect or missing information, I placed an update button at the end of the row where each employee is located in the table. I directed the user to the employee update modal through these buttons and automatically filled the fields to be filled in the modal with the existing information entered for the employee.
-   Again, for this purpose, I took advantage of the updateDoc() function offered by firebase and handled it with tanstack-query.
-   I created a delete employee button for all employees previously added to the table and redirected the user to a modal window that warns the user if they are sure they want to delete the employee, so that if the user accidentally clicks the delete employee button, they can delete the employee instantly and avoid victimizing the user.

## `Warehouse`

-   I created a warehouse page and route and stored this data on firebase. I used the getDocs() function provided by firebase to pull all warehouse data and processed this function with the useQuery function provided by Tanstack-Query.
-   In order for users to add a new item to their warehouse, I created an Add item button in the Toolbar section of my table and directed the user to the modal structure where the user can enter item information.
-   I created data entries such as item name, amount, purchase price, sale price and item description.
-   I placed an update button at the end of each row where each item is located in the table to update the added items and correct or complete any incorrect or missing information. Through these buttons, I directed the user to the item update modal and automatically filled the fields to be filled in the modal with the existing information entered for the selected item.

## `Companies`

-   I created a table structure and route where the user or the company can keep the records of the companies and companies that the user or the company does business with. I created a button in the toolbar section of this table to add new companies and through this button I directed the user to the modal window where they can enter the information of the company they want to add.
-   As in my other tables, I created a button group for each company in the last cell of the table row. I created modal windows where they can edit and delete the data of each added company.
-   At the same time, unlike my other tables, I created an operations page for each company in the companies route. On the operations page, I created all the detailed information about the company as well as a button to add new agreements for an agreement to be made with the company. I placed each added agreement at the bottom of the operations page and created an edit and delete properties for each agreement.

## `Filtering`

-   I created an input field in the toolbar of each of my tables and through this input, I enabled the user to search and filter the data by the name of the content in the table.

## `English & Turkish Language Support`

-   I handled all the fields in my project with the useTranslation hook provided by **i18next** and provided English - Turkish language support for all of them. I enabled the user to change the language at any time, either just before logging in on the login page or by accessing the header section throughout the application.

## `User Specific Data`

-   In order to prevent each user from seeing the same data, I created a users collection for each account created in firebase. All changes made in the application (added, deleted, edited) do not affect any other user because they are only in the sub-branches of that user. In this way, my project has turned into an application that can be used for many users at the same time.

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
-   i18next
-   Recharts
-   Date-fns
-   jsPDF
-   react-csv
-   Framer-motion

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

## `Çalışanlar`

-   MaterialUI Table componentinden yararlanarak oluşturduğum route'da çalışanların tüm bilgilerini tutan bir tablo oluşturdum. Tüm çalışanların listesini firebase üzerinde oluşturduğum bir koleksiyon olan **employees** koleksiyonundan aldım.
-   Yeni bir çalışan ekleyebilmek için tablomun toolbar kısmında bir ekleme butonu oluşturdum ve bu buton aracılığıyla kullanıcıyı yeni çalışan eklemek için gerekli olan bilgileri doldurabileceği modal sayfasına yönlendirdim. Yeni çalışanın tam ismi, iş başlığı, çalıştığı departman, maaş, işe giriş tarihi, yaş ve email gibi bilgileri kullanıcının doldurmasına ve tabloya yeni çalışanını yerleştirmesine olanak sağladım. Yeni çalışan eklemek için firebase'in sağladığı addDoc() fonksiyonundan yararlandım ve bu fonksiyonu tanstack-query ile ele aldım.
-   Eklenmiş çalışanların her birisini güncelleyebilmek ve varsa yanlış yada eksik girilen bilgilerin düzeltilmesi veya tamamlanması için tabloda her çalışanın bulunduğu satır sonuna bir güncelleme butonu yerleştirdim. Kullanıcıyı bu butonlar aracılığı ile çalışan güncelleme modalına yönlendirdim ve modal içerisinde doldurulacak alanları çalışan için girilmiş mevcut bilgiler ile otomatik olarak doldurdum.
-   Yine bu amaç için firebase'in sunduğu updateDoc() fonksiyonundan faydalandım ve tanstack-query ile ele aldım.
-   Tablodaki her bir çalışan için kullanıcının, çalışanların tüm bilgilerini görebileceği bir modal yapısı oluşturdum ve içerisini gerekli bilgiler ile doldurdum. Aynı zamanda çalışan detaylarının dökümünü alabilmesi adına bir "export as" butonu oluşturdum ve hem PDF hemde Excel yapısı ile modaldaki tüm çalışan bilgilerini kullanıcının bilgisayarlarına indirebilmesini sağladım.
-   Bu butonun işlevselliği için jsPDF, jspdf-autotable ve react-csv kütüphanelerinden, arayüz için ise projenin geri kalanında olduğu gibi MUI'dan faydalandım.
-   Tabloya daha önce eklenmiş tüm çalışanlar için bir çalışan silme butonu oluşturdum ve kullanıcıyı silmek istediğinden emin olup olmadığı konusunda uyaran bir modal penceresine yönlendirdim. Böylece kullanıcı yanlışlıkla çalışan silme butonuna tıkladığında çalışanı anında silip kullanıcıyı mağdur etmekten kaçındım.

## `Depolar`

-   Bir depolar sayfası&route'ı oluşturdum ve firebase üzerinde bu verileri sakladım. Tüm depo verilerini çekmek için firebase'in sağladığı getDocs() fonksiyonundan yararlandım ve bu fonksiyonumu Tanstack-Query'nin sağladığı useQuery fonksiyonu ile ele aldım.
-   Kullanıcılara, depolarına yeni bir malzeme ekleme için tablomun Toolbar kısmında bir Malzeme Ekle butonu oluşturdum ve kullanıcıyı malzeme bilgilerini girebileceği modal yapısına yönlendirdim.
-   Malzeme ismi, miktar, alış fiyatı, satış fiyatı, ve malzeme açıklaması gibi veri girişleri oluşturdum.
-   Eklenmiş malzemeleri güncelleyebilmek ve varsa yanlış yada eksik girilen bilgilerin düzeltilmesi veya tamamlanması için tabloda her malzemenin bulunduğu satır sonuna bir güncelleme butonu yerleştirdim. Kullanıcıyı bu butonlar aracılığı ile malzeme güncelleme modalına yönlendirdim ve modal içerisinde doldurulacak alanları seçilen malzeme için girilmiş mevcut bilgiler ile otomatik olarak doldurdum.

## `Şirketler`

-   Kullanıcının veya şirketin birlikte iş yaptığı firma ve şirketlerin kayıtlarını tutabileceği bir tablo yapısı ve route'ı oluşturdum. Bu tablonun toolbar kısmına yeni şirket ekleyebilmek için bir buton oluşturdum ve bu buton aracılığı ile kullanıcıyı eklemek istedikleri firmanın bilgilerini girebilecekleri modal penceresine yönlendirdim.
-   Diğer tablolarımda da olduğu gibi her şirket için tablo satırının son hücresinde bir buton grubu oluşturdum. Eklenmiş her bir şirketin verilerini düzenleyebilecekleri, silebilecekleri modal penceleri oluşturdum.
-   Aynı zamanda diğer tablolarımdan farklı olarak şirketler route'ında her bir şirket için bir operations sayfası oluşturdum. Operations sayfasında şirket hakkındaki tüm detaylı bilgilerin yanısıra şirket ile yapılacak bir anlaşma için yeni anlaşmalar ekleyebilecekleri bir buton oluşturdum. Eklenen herbir anlaşmayı operations sayfasının alt kısmına yerleştirdim ve herbir anlaşma için bir düzenleme ve silme özellikleri oluşturdum.

## `Filtreleme`

-   Her bir tablomun toolbar kısmına bir input alanı oluşturdum ve bu input vasıtasıyla kullanıcının tablo içerisinde içeriğin ismine göre arama yapabilmesine ve verilerini filtreleyebilmesine olanak sağladım.

## `İngilizce & Türkçe Dil Desteği`

-   Projemdeki tüm alanları **i18next** in sağladığı useTranslation hook'u ile ele aldım ve tamamına Ingilizce ve Türkçe dil desteği sağladım. Kullanıcının dil değişimini ister login sayfasında giriş yapmadan hemen önce isterse de uygulama boyunca header kısmından erişerek dilediği zaman değiştirebilmesini sağladım.

## `Kullanıcıya Özel Veri`

-   Her bir kullanıcının aynı verileri görmemesi adına firebase'de oluşturulan her hesap için bir users koleksiyonu oluşturdum. Uygulama içerisinde yapılan tüm değişiklikler(eklenen, silinen, düzenlenen) sadece o kullanıcının alt dallarında bulunduğu için diğer hiçbir kullanıcıyı etkilemiyor. Böylece projem birçok kullanıcı için aynı anda kullanılabilir bir uygulama haline dönüştü.
