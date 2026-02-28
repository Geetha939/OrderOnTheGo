import mongoose from 'mongoose';
import { User, Admin, Cart, FoodItem, Orders, Restaurant } from './Schema.js';

const cleanupDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/foodDelivery', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB');

        // Clear all collections
        console.log('Clearing all user accounts...');
        await User.deleteMany({});
        console.log('✓ All users cleared');

        console.log('Clearing all admin records...');
        await Admin.deleteMany({});
        console.log('✓ All admin records cleared');

        console.log('Clearing all restaurant records...');
        await Restaurant.deleteMany({});
        console.log('✓ All restaurants cleared');

        console.log('Clearing all food items...');
        await FoodItem.deleteMany({});
        console.log('✓ All food items cleared');

        console.log('Clearing all orders...');
        await Orders.deleteMany({});
        console.log('✓ All orders cleared');

        console.log('Clearing all cart items...');
        await Cart.deleteMany({});
        console.log('✓ All cart items cleared');

        console.log('\n✅ Database cleanup completed successfully!');
        console.log('System is now in a clean state with zero users.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        process.exit(1);
    }
};

cleanupDatabase();
