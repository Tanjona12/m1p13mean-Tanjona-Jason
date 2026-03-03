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
import { BoutiqueAccueil } from './pages/boutique/boutique-accueil/boutique-accueil';
import { AdminAddBoutique } from './pages/admin/admin-add-boutique/admin-add-boutique';
import { BoutiqueAddProduit } from './pages/boutique/boutique-add-produit/boutique-add-produit';
import { BoutiqueUpdateBoutique } from './pages/boutique/boutique-update-boutique/boutique-update-boutique';
import { BoutiqueUpdateProduit } from './pages/boutique/boutique-update-produit/boutique-update-produit';
import { BoutiqueUpdateProfile } from './pages/boutique/boutique-update-profile/boutique-update-profile';

import { authGuard } from "./guards/auth.guard";
import { roleGuard } from './guards/role.guard';

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
                component:Profile,
                canActivate: [authGuard]
            },
            {
                path:'update_profile',
                component:ModifUtilisateur,
                canActivate: [authGuard]
            }
        ]
    },
    {
        path:'admin',
        component:AdminNavbar,
        canActivate: [authGuard, roleGuard],
        data: { role: 'admin' },
        children: [
            {
                path:'',
                component:AdminDashboard
            },
            {
                path:'add_shop',
                component:AdminAddBoutique
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
        canActivate: [authGuard, roleGuard],
        data: { role: 'boutique' },
        children: [
            {
                path:'',
                component:BoutiqueAccueil
            },
            {
                path:'shop',
                component:BoutiqueBoutiques
            },
            {
                path:'shop/:id',
                component:BoutiqueBoutique
            },
            {
                path:'update_shop/:id',
                component:BoutiqueUpdateBoutique
            },
            {
                path:'add_product',
                component:BoutiqueAddProduit
            },
            {
                path:'product/:id',
                component:BoutiqueProduit
            },
            {
                path:'update_product/:id',
                component:BoutiqueUpdateProduit
            },
            {
                path:'update_profil/:id',
                component:BoutiqueUpdateProfile
            },
            {
                path:'profil',
                component:BoutiqueProfile
            }
        ]
    }
];
