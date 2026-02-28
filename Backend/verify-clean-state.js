/**
 * Verification Script - Check if system has been properly reset
 * Run this script to verify that all credentials and accounts have been removed
 */

import mongoose from 'mongoose';
import { User, Admin, Cart, FoodItem, Orders, Restaurant } from './Schema.js';

const verifyCleanState = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/foodDelivery', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('\n========== SYSTEM VERIFICATION REPORT ==========\n');

        // Check User accounts
        const userCount = await User.countDocuments({});
        console.log(`1. User Accounts: ${userCount === 0 ? '✓ CLEAN' : '❌ FOUND ' + userCount} `);
        if (userCount > 0) {
            const users = await User.find({});
            users.forEach(user => console.log(`   - ${user.email} (${user.usertype})`));
        }

        // Check Admin records
        const adminCount = await Admin.countDocuments({});
        console.log(`2. Admin Records: ${adminCount === 0 ? '✓ CLEAN' : '❌ FOUND ' + adminCount}`);

        // Check Restaurant accounts
        const restaurantCount = await Restaurant.countDocuments({});
        console.log(`3. Restaurant Accounts: ${restaurantCount === 0 ? '✓ CLEAN' : '❌ FOUND ' + restaurantCount}`);

        // Check Orders
        const orderCount = await Orders.countDocuments({});
        console.log(`4. Order Records: ${orderCount === 0 ? '✓ CLEAN' : '❌ FOUND ' + orderCount}`);

        // Check Food Items
        const foodCount = await FoodItem.countDocuments({});
        console.log(`5. Food Items: ${foodCount === 0 ? '✓ CLEAN' : '❌ FOUND ' + foodCount}`);

        // Check Cart items
        const cartCount = await Cart.countDocuments({});
        console.log(`6. Cart Items: ${cartCount === 0 ? '✓ CLEAN' : '❌ FOUND ' + cartCount}`);

        console.log('\n==============================================\n');

        const allClean = userCount === 0 && adminCount === 0 && restaurantCount === 0 && 
                         orderCount === 0 && foodCount === 0 && cartCount === 0;

        if (allClean) {
            console.log('✅ VERIFICATION PASSED');
            console.log('System is in a clean state with zero users and credentials.\n');
        } else {
            console.log('⚠️  VERIFICATION FAILED');
            console.log('Some data still exists in the database.\n');
        }

        process.exit(allClean ? 0 : 1);
    } catch (error) {
        console.error('❌ Verification error:', error.message);
        process.exit(1);
    }
};

verifyCleanState();
