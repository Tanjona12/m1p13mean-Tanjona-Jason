import { Routes } from '@angular/router';
import { Navbar } from './pages/client/navbar/navbar';
import { Home } from './pages/client/home/home';
import { AdminNavbar } from './pages/admin/admin-navbar/admin-navbar';
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { AdminBoutique } from './pages/admin/admin-boutique/admin-boutique';
import { BoutiqueNavbar } from './pages/boutique/boutique-navbar/boutique-navbar';
import { BoutiqueProfile } from './pages/boutique/boutique-profile/boutique-profile';
import { Login } from './pages/client/login/login';
import { Register } from './pages/client/register/register';
import { Boutiques } from './pages/client/boutiques/boutiques';
import { Boutique } from './pages/client/boutique/boutique';
import { Produit } from './pages/client/produit/produit';
import { Panier } from './pages/client/panier/panier';
import { Profile } from './pages/client/profile/profile';
import { ModifUtilisateur } from './pages/client/modif-utilisateur/modif-utilisateur';
import { AdminUser } from './pages/admin/admin-user/admin-user';
import { AdminBoutiques } from './pages/admin/admin-boutiques/admin-boutiques';
import { AdminUpdateBoutique } from './pages/admin/admin-update-boutique/admin-update-boutique';
import { AdminUsers } from './pages/admin/admin-users/admin-users';
import { AdminAddUser } from './pages/admin/admin-add-user/admin-add-user';
import { AdminUpdateUser } from './pages/admin/admin-update-user/admin-update-user';
import { BoutiqueProduit } from './pages/boutique/boutique-produit/boutique-produit';
import { BoutiqueBoutiques } from './pages/boutique/boutique-boutiques/boutique-boutiques';
import { BoutiqueBoutique } from './pages/boutique/boutique-boutique/boutique-boutique';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'',
        pathMatch:'full'
    },
    {
        path:'',
        component:Navbar,
        children: [
            {
                path:'',
                component:Home
            },
            {
                path:'login',
                component:Login
            },
            {
                path:'register',
                component:Register
            },
            {
                path:'shop',
                component:Boutiques
            },
            {
                path:'shop/:id',
                component:Boutique
            },
            {
                path:'product/:id',
                component:Produit
            },
            {
                path:'panier',
                component:Panier
            },
            {
                path:'profile',
                component:Profile
            },
            {
                path:'update_profile',
                component:ModifUtilisateur
            }
        ]
    },
    {
        path:'admin',
        component:AdminNavbar,
        children: [
            {
                path:'',
                component:AdminDashboard
            },
            {
                path:'shop',
                component:AdminBoutiques
            },
            {
                path:'shop/:id',
                component:AdminBoutique
            },
            {
                path:'update_shop/:id',
                component:AdminUpdateBoutique
            },
            {
                path:'users',
                component:AdminUsers
            },
            {
                path:'user/:id',
                component:AdminUser
            },
            {
                path:'add_user',
                component:AdminAddUser
            },
            {
                path:'update_user',
                component:AdminUpdateUser
            }
        ]
    },
    {
        path:'owner',
        component:BoutiqueNavbar,
        children: [
            {
                path:'shop',
                component:BoutiqueBoutiques
            },
            {
                path:'shop/:id',
                component:BoutiqueBoutique
            },
            {
                path:'product',
                component:BoutiqueProduit
            },
            {
                path:'profile',
                component:BoutiqueProfile
            }
        ]
    }
];
