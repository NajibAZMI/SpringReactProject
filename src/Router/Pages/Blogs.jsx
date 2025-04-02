import React from 'react'

export default function Blogs() {
  return (
                    <div class="container py-5 text-center">
                    <h1 class="fw-bold">Pricing</h1>
                    <p class="text-muted">Quickly build an effective pricing table for your potential customers with this Bootstrap example.</p>
                
                    <div class="row row-cols-1 row-cols-md-3 g-4 mt-4">
                       
                        <div class="col">
                            <div class="card border shadow-sm">
                                <div class="card-header bg-white fw-bold">Free</div>
                                <div class="card-body">
                                    <h2 class="fw-bold">$0<small class="text-muted">/mo</small></h2>
                                    <ul class="list-unstyled mt-3 mb-4">
                                        <li>10 users included</li>
                                        <li>2 GB of storage</li>
                                        <li>Email support</li>
                                        <li>Help center access</li>
                                    </ul>
                                    <a href="#" class="btn btn-outline-primary w-100">Sign up for free</a>
                                </div>
                            </div>
                        </div>
                
                        <div class="col">
                            <div class="card border shadow-sm">
                                <div class="card-header bg-white fw-bold">Pro</div>
                                <div class="card-body">
                                    <h2 class="fw-bold">$15<small class="text-muted">/mo</small></h2>
                                    <ul class="list-unstyled mt-3 mb-4">
                                        <li>20 users included</li>
                                        <li>10 GB of storage</li>
                                        <li>Priority email support</li>
                                        <li>Help center access</li>
                                    </ul>
                                    <a href="#" class="btn btn-primary w-100">Get started</a>
                                </div>
                            </div>
                        </div>
                
                     
                        <div class="col">
                            <div class="card border shadow-sm">
                                <div class="card-header text-white bg-primary fw-bold">Enterprise</div>
                                <div class="card-body">
                                    <h2 class="fw-bold">$29<small class="text-muted">/mo</small></h2>
                                    <ul class="list-unstyled mt-3 mb-4">
                                        <li>30 users included</li>
                                        <li>15 GB of storage</li>
                                        <li>Phone and email support</li>
                                        <li>Help center access</li>
                                    </ul>
                                    <a href="#" class="btn btn-primary w-100">Contact us</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
  )
}