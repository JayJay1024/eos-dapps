#include <eosiolib/asset.hpp>
#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>

namespace eosio {

    class task : public contract {
        public:
            task( account_name self ):contract(self),accounts(self, self){}

            /// @abi action
            void create(account_name owner, uint32_t passwd);
            void login(account_name user, uint32_t passwd);
            void logout(account_name user, uint32_t passwd);
            void deposit(account_name to, asset quantity);
            void withdraw(account_name from, asset quantity);
            void getbalance(account_name user, uint32_t passwd);

        private:

            //@abi table accounts i64
            struct account {
                account_name user;
                uint32_t     passwd;
                asset        balance;
                uint8_t      status;  // login or logout

                uint64_t primary_key()const { return user; }

                EOSLIB_SERIALIZE(account, (user)(passwd)(balance)(status))
            };

            typedef multi_index<N(accounts),account> account_table;
            account_table accounts;
    };

    void task::create(account_name owner, uint32_t passwd) {

        print("task::create ");
        require_auth( _self );

        auto existing = accounts.find( owner );
        eosio_assert( existing == accounts.end(), "owner with symbol already exists" );

        accounts.emplace( _self, [&]( auto& s ) {
            s.user            = owner;
            s.passwd          = passwd;
            s.balance.amount  = 0;
            s.status          = 0;  // default logout after create
        });
    }

    void task::login(account_name user, uint32_t passwd) {

        print("task::login ");
        require_auth( _self );

        auto existing = accounts.find( user );
        eosio_assert( existing != accounts.end(), "user does not exist" );

        const auto& acc = accounts.get( user );
        eosio_assert( passwd == acc.passwd, "passwd error" );

        accounts.modify( acc, 0, [&]( auto& s ) {
            s.status = 1;
        });
    }

    void task::logout(account_name user, uint32_t passwd) {

        print("task::logout ");
        require_auth( _self );

        auto existing = accounts.find( user );
        eosio_assert( existing != accounts.end(), "user does not exist" );

        const auto& acc = accounts.get( user );
        eosio_assert( passwd == acc.passwd, "passwd error" );

        accounts.modify( acc, 0, [&]( auto& s ) {
            s.status = 0;
        });
    }

    void task::deposit(account_name to, asset quantity) {

        print("task::deposit ");
        require_auth( _self );
        eosio_assert(quantity.amount > 0, "quantity must be positive");

        auto existing = accounts.find( to );
        eosio_assert( existing != accounts.end(), "user does not exist" );

        const auto& acc = accounts.get( to );
        eosio_assert( 1 == acc.status, "login first please" );

        accounts.modify( acc, 0, [&]( auto& s ) {
            s.balance += quantity;
        });
    }

    void task::withdraw(account_name from, asset quantity) {

        print("task::withdraw ");
        require_auth( _self );

        auto existing = accounts.find( from );
        eosio_assert( existing != accounts.end(), "user does not exist" );

        const auto& acc = accounts.get( from );
        eosio_assert( 1 == acc.status, "login first please" );
        eosio_assert( acc.balance.amount >= quantity.amount, "overdrawn balance" );

        accounts.modify( acc, 0, [&]( auto& s ) {
            s.balance -= quantity;
        });
    }

    void task::getbalance(account_name user, uint32_t passwd) {

        print("task::getbalance ");
        require_auth( _self );

        auto existing = accounts.find( user );
        eosio_assert( existing != accounts.end(), "user does not exist" );

        const auto& acc = accounts.get( user );
        eosio_assert( passwd == acc.passwd, "passwd error" );
        eosio_assert( 1 == acc.status, "login first please" );

        acc.balance.print();
    }

   EOSIO_ABI( task, (create)(login)(logout)(deposit)(withdraw)(getbalance) )
} /// namespace eosio

