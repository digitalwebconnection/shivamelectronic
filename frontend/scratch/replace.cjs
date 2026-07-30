const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, '..', 'src', 'pages', 'admin', 'AdminPage.tsx');
let content = fs.readFileSync(filepath, 'utf8');

// 1. Add imports
content = content.replace(
  "import logo from '../../assets/image.png';",
  `import logo from '../../assets/image.png';
import { OverviewSection } from './sections/OverviewSection';
import { ProductsSection } from './sections/ProductsSection';
import { CategoriesSection } from './sections/CategoriesSection';
import { OrdersSection } from './sections/OrdersSection';
import { UsersSection } from './sections/UsersSection';`
);

// 2. Remove localized state for Products
const productStateRegex = /\/\/ Search query state[\s\S]*?\/\/ Count of unique categories/;
content = content.replace(productStateRegex, '// Count of unique categories');

// 3. Remove localized state for Categories
const categoryStateRegex = /\/\/ Category Pagination state[\s\S]*?\/\/ Category form fields/;
content = content.replace(categoryStateRegex, '// Category form fields');

// 4. Remove localized state for Users
const userStateRegex = /\/\/ User Pagination state[\s\S]*?const fetchUsers = async/;
content = content.replace(userStateRegex, 'const fetchUsers = async');

// 5. Remove localized state for Orders
const orderStateRegex1 = /const \[orderSearchQuery[\s\S]*?const ORDERS_PER_PAGE = 10;/;
content = content.replace(orderStateRegex1, '');

const orderStateRegex2 = /\/\/ Filter orders by search[\s\S]*?const paginatedOrders = sortedOrders\.slice\([^)]+\);/m;
content = content.replace(orderStateRegex2, '');

// 6. Replace Render blocks
const renderStart = "{activeTab === 'overview' && (";
const renderEnd = "</main>";
const replaceWith = `
          {activeTab === 'overview' && (
            <OverviewSection
              productsCount={products.length}
              uniqueCategoriesCount={uniqueCategoriesCount}
              usersCount={users.length}
              ordersCount={orders.length}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersSection
              orders={orders}
              loadingOrders={loadingOrders}
              fetchOrders={fetchOrders}
              handleUpdateOrderStatus={handleUpdateOrderStatus}
            />
          )}

          {activeTab === 'products' && (
            <ProductsSection
              products={products}
              openProductForm={openProductForm}
              handleToggleHot={handleToggleHot}
              handleDeleteProduct={handleDeleteProduct}
            />
          )}

          {activeTab === 'categories' && (
            <CategoriesSection
              categories={categories}
              openCategoryForm={openCategoryForm}
              handleDeleteCategory={handleDeleteCategory}
            />
          )}

          {activeTab === 'users' && (
            <UsersSection
              users={users}
              loadingUsers={loadingUsers}
            />
          )}
        `;

const startIndex = content.indexOf(renderStart);
const endIndex = content.indexOf(renderEnd, startIndex);
if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + replaceWith.trim() + '\n        </main>' + content.substring(endIndex + renderEnd.length);
}

fs.writeFileSync(filepath, content, 'utf8');
console.log("Replaced successfully!");
