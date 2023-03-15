### ทดสอบสร้าง service การส่งอีเมล แบบง่าย

สามารถทดลองใช้งานผ่าน URL: https://lbt-frontend.onrender.com/

เข้าหน้าเว็บมองหาปุ่ม new mail เพื่อส่งอีเมล

โดยจะมีหัวข้อ
- To คือ ผู้รับ
- Subject คือ หัวข้ออีเมล
- Text คือ เนื้อหาเมลที่ต้องการจะเขียนลงไป

และกด OK เพื่อทำการส่ง

หลังจาก ส่งอีเมล สำเร็จ หรือ ไม่สำเร็จ ระบบจะทำการบันทึก log ไว้ที่ฐานข้อมูล

โดยจะเก็บข้อมูล ผู้ส่ง, ผู้รับ, ผู้ให้บริการเมล, หัวข้อเมล, เนื้อหาเมล, ข้อผิดพลาด(หากส่งไม่สำเร็จ), และวันที่บันทึก

หากมีการบันทึก log แล้ว จะสามารถเห็นข้อมูลในหน้าเว็บได้

#### ......

ในระบบนี้จะใช้ผู้ให้บริการอีเมล 2 เจ้า คือ SendGrid กับ MailGun

และไม่เปิด Field ให้กำหนดอีเมลผู้ส่ง เพราะมีบางเจ้า ใช้การยืนยันอีเมลของ Sender จึงต้อง Fix email

สิ่งที่ขาดไปคือการส่งอีเมล ได่ หลาย ๆ เมลไปคราวเดียว

#### ......


ระบบทั้ง Frontend และ Backend ได้ Deploy ไว้ที่ render.com
```หากระบบทำงานช้าหรือไม่โหลด อาจจะเป็นเพราะว่าใช้ ฟรี ต้อง cold start สักหน่อย```

และทำการแยก Frontend และ Backend ออกจากกันชัดเจน


### Backend
เนื่องจากไม่ได้เขียน Backend มาเป็นระยะปีกว่า ๆ สิ่งที่ใช้งานล่าสุดคือ Laravel และทุกวันนี้เขียนแต่ Frontend จึงทำให้ไม่อยากออกจาก Environment ของ Nodejs และอยากเขียน Typescript มากกว่า เลยเลือกที่จะลองใช้เวลาเรียนรู้สิ่งใหม่ ให้พอใช้งานได้ภายใน 1-2 วัน โดยการเลือก NestJS มาเขียน API อย่างน้อยก็ได้คุ้นเคยกับมันก็ถือว่าคุ้ม

เหตุผลที่เลือกเพราะมีตัวช่วยที่ครบเหมือน Laravel และ Learning Curve ไม่สูงมากนัก

ฐานข้อมูลตอนแรกใช้ MariaDB แต่ render รองรับแค่ PostgreSQL จึงได้เปลี่ยนในภายหลังตอน Deploy ก็สามารถใช้งาน code เดิมได้


### frontend
ส่วน Frontend เลือกใช้ ReactJS เพราะมีโค้ดบางส่วนที่เพิ่งเขียนเก็บไว้ สามารถหยิบนำมาแก้ไขและใช้ได้ต่อ บางส่วนที่ไม่อยากเขียนใหม่ เลยหยิบ And Design มาใช้บางส่วนเพื่อประหยัดเวลา

#### ......

ในการ set environment นั้น ได้ตั้งค่าไว้ใน render หมดแล้ว ไม่ได้ทำการอัปโหลดไฟล์ env เข้ามา เพื่อป้องการพวก key ต่าง ๆ หลุดเข้ามา

#### ......

การ dev ใน local ใช้ docker มาช่วยจำลอง database เลยได้ push docker-compose ขึ้นมาเก็บไว้ด้วย

#### ......

ระบบต่าง ๆ และ Code quality สามารถปรับให้ดีขึ้นได้ หากใช้ระยะเวลามากกว่านี้
ส่วนเรื่อง test ยังไม่มีเวลาที่จะทำในตอนนี้