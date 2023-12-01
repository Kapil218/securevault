# SPDX-License-Identifier: GPL-3.0
# Corrected SmartPy code

import smartpy as sp

@sp.module  
def main():
    class Upload(sp.Contract):
        def __init__(self):
                self.data.result=sp.cast([], sp.list[sp.string])
                self.data.accessContainer = sp.cast([], sp.list[sp.string])
                self.data.value = sp.cast({}, sp.map[sp.string,sp.set[sp.string]])
                
                self.data.accessList = sp.cast({}, sp.map[sp.string, sp.set[sp.string]])
                
                # self.data.previousData = sp.cast({}, sp.map[sp.address,sp.map[sp.address,sp.bool]]) 
                
        @sp.entry_point
        def add(self, params):
            if(self.data.value.contains(params.user)):
                self.data.value[params.user].add(params.url)
            else:
                self.data.value[params.user] = sp.set(params.url)

        @sp.entry_point
        def allowAccess(self, params):      
            if (self.data.accessList.contains(params.p1)):
                self.data.accessList[params.user].add(params.p1) 
                
            else:
                self.data.accessList[params.p1] = sp.set(params.user)
           
    
        @sp.entry_point
        def disallow(self, params):
            assert self.data.accessList.contains(params.sender), "USER Does not exists"
            if(self.data.accessList[params.sender].contains(params.user)):
              self.data.accessList[params.sender].remove(params.user)
    
        @sp.entry_point
        def display(self, params):
            
            # assert (params.user == params.sender), 'Error INvalid user'
            # return sp.cast(sp.list[], self.data.value[params.user].elements())
            self.data.result =self.data.value[params.user].elements()
            # return self.data.value[params.user]
    
        @sp.entry_point
        def shareAccess(self,params):
            self.data.accessContainer=self.data.accessList[params.sender].elements()
            
    
#Tests
@sp.add_test(name="Test")
def test():
     # Create a test scenario
     c1  = main.Upload()
     scenario = sp.test_scenario(main)
     scenario.h1("Welcome")
     scenario +=c1
     c1.add(user='alice', url ='www.ipfs.vascsd./')
     c1.add(user='bob', url ='www.ipfs.ccwdvdso./')
     c1.add(user='alice', url='www.ipfs.gateway.pintata.ffdsf/')
     c1.display(user='alice')
     c1.allowAccess(p1='bob', user='alice') 
      
    
    
    ##########